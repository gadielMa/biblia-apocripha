const tree = document.querySelector('.family-tree');

if (tree) {
  const nodeName = node => node?.firstChild?.textContent?.trim() || '';
  const trunk = Array.from(tree.querySelectorAll(':scope > .tree-node'));
  const davidIndex = trunk.findIndex(node => nodeName(node) === 'David');
  const explicitRelations = {
    'Adán': 'Padre de: Caín, Abel y Set',
    'Noé': 'Padre de: Sem, Cam y Jafet',
    'Abraham': 'Padre de: Isaac e Ismael',
    'Isaac': 'Padre de: Jacob y Esaú',
    'Jacob': 'Padre de: Judá, Leví, José y sus hermanos',
    'David': 'Padre de: Salomón, Natán y otros hijos'
  };

  trunk.slice(0, davidIndex + 1).forEach((node, index, chain) => {
    node.dataset.relation = explicitRelations[nodeName(node)] || (chain[index + 1] ? `Padre de: ${nodeName(chain[index + 1])}` : '');
  });

  tree.querySelectorAll('.tree-branch').forEach(branch => {
    const nodes = Array.from(branch.querySelectorAll(':scope > .tree-node'));
    nodes.forEach((node, index) => {
      if (!node.dataset.relation) node.dataset.relation = nodes[index + 1] ? `Padre de: ${nodeName(nodes[index + 1])}` : 'La rama llega hasta José';
    });
  });

  const ages = {
    'Adán': '930 años', 'Set': '912 años', 'Enós': '905 años', 'Cainán': '910 años',
    'Mahalaleel': '895 años', 'Jared': '962 años', 'Enoc': '365 años', 'Matusalén': '969 años',
    'Lamec': '777 años', 'Noé': '950 años', 'Sem': '600 años', 'Arfaxad': '438 años',
    'Sala': '433 años', 'Heber': '464 años', 'Peleg': '239 años', 'Reu': '239 años',
    'Serug': '230 años', 'Taré': '205 años', 'Abraham': '175 años', 'Isaac': '180 años',
    'Jacob': '147 años', 'José': '110 años'
  };
  tree.querySelectorAll('.tree-node').forEach(node => {
    const age = ages[nodeName(node)];
    if (!age || node.querySelector(':scope > .tree-age')) return;
    const badge = document.createElement('span');
    badge.className = 'tree-age';
    badge.textContent = age;
    node.append(badge);
  });

  tree.querySelectorAll(':scope > .tree-verse').forEach(verse => {
    const target = Array.from(tree.querySelectorAll('.tree-node')).find(node => nodeName(node) === verse.dataset.target);
    if (target) target.append(verse);
  });

  const positionDates = () => {
    const rail = tree.querySelector('.tree-date-rail');
    if (!rail) return;
    const treeTop = tree.getBoundingClientRect().top;
    const positions = [];
    rail.querySelectorAll('.tree-date-mark').forEach(mark => {
      const selector = mark.dataset.dateBranch === 'trunk'
        ? ':scope > .tree-node'
        : mark.dataset.dateBranch === 'mateo'
          ? '.tree-branch[aria-label="Rama de Mateo por Salomón"] > .tree-node'
          : mark.dataset.dateBranch === 'jesus'
            ? '.tree-jesus-family > .tree-node'
            : '.jose-parent > .tree-node';
      const target = Array.from(tree.querySelectorAll(selector)).find(node => nodeName(node) === mark.dataset.dateTarget);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const y = rect.top - treeTop + rect.height / 2;
      mark.style.top = `${y}px`;
      positions.push(y);
    });
    if (positions.length) {
      rail.style.setProperty('--rail-start', `${Math.min(...positions)}px`);
      rail.style.setProperty('--rail-end', `${Math.max(0, tree.offsetHeight - Math.max(...positions))}px`);
    }
  };

  requestAnimationFrame(positionDates);
  window.addEventListener('load', positionDates, { once: true });
  window.addEventListener('resize', positionDates, { passive: true });
}
