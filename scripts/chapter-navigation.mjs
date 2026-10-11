export function getAdjacentChapterTargets({ bookId, chapterIndex, chapters, orderedBooks, previousBookLastChapter = null }) {
  const bookIndex = orderedBooks.findIndex(book => book.id === bookId);
  const book = orderedBooks[bookIndex];
  if (!book || chapterIndex < 0 || chapterIndex >= chapters.length) {
    return { previous: null, next: null };
  }

  const previous = chapterIndex > 0
    ? { book, chapter: Number(chapters[chapterIndex - 1].number) }
    : bookIndex > 0 && previousBookLastChapter != null
      ? { book: orderedBooks[bookIndex - 1], chapter: Number(previousBookLastChapter) }
      : null;
  const next = chapterIndex < chapters.length - 1
    ? { book, chapter: Number(chapters[chapterIndex + 1].number) }
    : bookIndex >= 0 && bookIndex < orderedBooks.length - 1
      ? { book: orderedBooks[bookIndex + 1], chapter: 1 }
      : null;
  return { previous, next };
}
