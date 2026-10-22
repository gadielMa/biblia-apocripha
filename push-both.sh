#!/usr/bin/env bash
set -euo pipefail

BIBLIA_ROOT="/Users/gadiel/gadielMa/biblia-apocripha"
INDULIRU_ROOT="/Users/gadiel/gadielMa/induliru"
BIBLE_SUBMODULE="$INDULIRU_ROOT/biblia"
BIBLE_BRANCH="main"
INDULIRU_BRANCH="master"

die() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

confirm() {
  local answer
  printf '%s [escribí sí para continuar]: ' "$1"
  read -r answer
  [[ "$answer" == "sí" || "$answer" == "si" ]]
}

assert_repo() {
  local path="$1" expected="$2" actual
  [[ -d "$path" ]] || die "No existe el directorio: $path"
  actual="$(git -C "$path" rev-parse --show-toplevel 2>/dev/null)" || die "No es un repositorio Git: $path"
  [[ "$actual" == "$expected" ]] || die "El repositorio en $path no coincide con la ruta esperada ($expected)."
}

assert_branch() {
  local path="$1" expected="$2" actual
  actual="$(git -C "$path" branch --show-current)"
  [[ "$actual" == "$expected" ]] || die "Se esperaba la rama $expected en $path, pero estás en '$actual'. No cambio ramas automáticamente."
}

assert_pushable() {
  local path="$1" branch="$2" counts behind ahead
  git -C "$path" fetch origin "$branch"
  git -C "$path" show-ref --verify --quiet "refs/remotes/origin/$branch" || die "No existe origin/$branch."
  git -C "$path" merge-base --is-ancestor "origin/$branch" HEAD || die "La rama local $branch está detrás o divergió de origin/$branch. Resolverlo manualmente y volver a ejecutar."
  counts="$(git -C "$path" rev-list --left-right --count "origin/$branch...HEAD")"
  read -r behind ahead <<< "$counts"
  [[ "$behind" == "0" ]] || die "origin/$branch tiene commits que no están en la rama local."
}

assert_repo "$BIBLIA_ROOT" "$BIBLIA_ROOT"
assert_repo "$INDULIRU_ROOT" "$INDULIRU_ROOT"
assert_repo "$BIBLE_SUBMODULE" "$BIBLE_SUBMODULE"
assert_branch "$BIBLIA_ROOT" "$BIBLE_BRANCH"
assert_branch "$INDULIRU_ROOT" "$INDULIRU_BRANCH"
assert_branch "$BIBLE_SUBMODULE" "$BIBLE_BRANCH"

printf '\n== Biblia: cambios locales ==\n'
if [[ -n "$(git -C "$BIBLIA_ROOT" status --porcelain)" ]]; then
  git -C "$BIBLIA_ROOT" status --short
  confirm "¿Incluyo y confirmo todos estos cambios de biblia-apocripha?" || die "Cancelado; no cambié ni publiqué nada."
  git -C "$BIBLIA_ROOT" add -A
  if ! git -C "$BIBLIA_ROOT" diff --cached --quiet; then
    message="${1:-Update Bible section content}"
    git -C "$BIBLIA_ROOT" commit -m "$message"
  fi
else
  printf 'No hay cambios locales para confirmar.\n'
fi

printf '\n== Publicando biblia-apocripha/%s ==\n' "$BIBLE_BRANCH"
assert_pushable "$BIBLIA_ROOT" "$BIBLE_BRANCH"
git -C "$BIBLIA_ROOT" push origin "$BIBLE_BRANCH"

printf '\n== Actualizando submódulo en induliru ==\n'
[[ -z "$(git -C "$BIBLE_SUBMODULE" status --porcelain)" ]] || die "El submódulo tiene cambios locales. No los sobrescribo."
if ! git -C "$INDULIRU_ROOT" diff --cached --quiet; then
  die "induliru tiene cambios ya preparados en staging. No los incluyo en este commit."
fi
git -C "$BIBLE_SUBMODULE" fetch origin "$BIBLE_BRANCH"
git -C "$BIBLE_SUBMODULE" pull --ff-only origin "$BIBLE_BRANCH"

git -C "$INDULIRU_ROOT" add biblia
if ! git -C "$INDULIRU_ROOT" diff --cached --quiet -- biblia; then
  git -C "$INDULIRU_ROOT" commit -m "Update Biblia submodule"
else
  printf 'El puntero de biblia ya estaba actualizado; no hace falta otro commit.\n'
fi

printf '\n== Publicando induliru/%s ==\n' "$INDULIRU_BRANCH"
assert_pushable "$INDULIRU_ROOT" "$INDULIRU_BRANCH"
git -C "$INDULIRU_ROOT" push origin "$INDULIRU_BRANCH"

printf '\nPublicado correctamente en ambos repositorios.\n'
