const tree = document.querySelector('.family-tree');

if (tree) {
  const nodeName = node => node?.dataset.name || node?.firstChild?.textContent?.trim() || '';
  const trunk = Array.from(tree.querySelectorAll(':scope > .tree-node'));
  const davidIndex = trunk.findIndex(node => nodeName(node) === 'David');
  const explicitRelations = {
    'Adán': 'Padre de Caín, Abel, Set y otros hijos e hijas; Jubileos nombra a Awán y Azura y añade nueve hijos varones',
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

  const addSource = (node, book, chapter, verse, label) => {
    const link = document.createElement('a');
    link.className = 'tree-source';
    link.href = `lectura/?obra=${book}&capitulo=${chapter}#pasaje-${chapter}-${verse}`;
    link.textContent = `(s/${label})`;
    node.append(link);
  };
  const trunkSources = {
    'Adán': ['genesis', 5, 1], 'Set': ['genesis', 5, 3], 'Enós': ['genesis', 5, 6],
    'Cainán': ['genesis', 5, 9], 'Mahalaleel': ['genesis', 5, 12], 'Jared': ['genesis', 5, 15],
    'Enoc': ['genesis', 5, 18], 'Matusalén': ['genesis', 5, 21], 'Lamec': ['genesis', 5, 25],
    'Noé': ['genesis', 5, 29], 'Sem': ['genesis', 5, 32], 'Arfaxad': ['genesis', 11, 10],
    'Sala': ['genesis', 11, 12], 'Heber': ['genesis', 11, 14], 'Peleg': ['genesis', 11, 16],
    'Reu': ['genesis', 11, 18], 'Serug': ['genesis', 11, 20], 'Nacor': ['genesis', 11, 22],
    'Taré': ['genesis', 11, 24], 'Abraham': ['genesis', 11, 26], 'Isaac': ['genesis', 21, 3],
    'Jacob': ['genesis', 25, 26], 'Judá': ['genesis', 29, 35], 'Fares': ['genesis', 38, 29],
    'Esrom': ['mateo', 1, 3], 'Aram': ['mateo', 1, 3], 'Aminadab': ['mateo', 1, 4],
    'Naasón': ['mateo', 1, 4], 'Salmón': ['mateo', 1, 4], 'Booz': ['mateo', 1, 5],
    'Obed': ['mateo', 1, 5], 'Isaí': ['mateo', 1, 5], 'David': ['mateo', 1, 6]
  };
  const aliases = {
    'Aram': 'Aram / Ram', 'Fares': 'Fares / Pérez', 'Esrom': 'Esrom / Hezrón',
    'Isaí': 'Isaí / Jesé', 'Heli': 'Helí / Elí', 'Asa': 'Asa / Asaf', 'Amón': 'Amón / Amós',
    'Salatiel': 'Salatiel / Sealtiel', 'Resa': 'Resa / Rhesa', 'Booz': 'Booz / Boaz'
  };
  tree.querySelectorAll('.tree-node').forEach(node => {
    const name = nodeName(node);
    node.dataset.name = name;
    if (aliases[name]) node.firstChild.textContent = aliases[name];
  });
  trunk.forEach(node => {
    const source = trunkSources[nodeName(node)];
    if (!source) return;
    const [book, chapter, verse] = source;
    addSource(node, `rvr1909-${book}`, chapter, verse, `${book === 'genesis' ? 'Génesis' : 'Mateo'} ${chapter}:${verse}`);
  });
  const branchVerses = {
    mateo: [6,7,7,7,8,8,8,9,9,9,10,10,10,11,12,12,13,13,13,14,14,14,15,15,15,16],
    lucas: [31,31,31,31,30,30,30,30,30,29,29,29,29,29,28,28,28,28,28,27,27,27,27,27,26,26,26,26,26,25,25,25,25,25,24,24,24,24,24,23,23]
  };
  tree.querySelectorAll('.tree-branch').forEach(branch => {
    const book = branch.getAttribute('aria-label').includes('Mateo') ? 'mateo' : 'lucas';
    const chapter = book === 'mateo' ? 1 : 3;
    branch.querySelectorAll(':scope > .tree-node').forEach((node, index) => {
      const verse = branchVerses[book][index];
      if (verse) addSource(node, `rvr1909-${book}`, chapter, verse, `${book === 'mateo' ? 'Mateo' : 'Lucas'} ${chapter}:${verse}`);
    });
  });
  tree.querySelectorAll('.tree-parent > .tree-node, .tree-jesus-family > .tree-node').forEach(node => {
    if (nodeName(node) === 'María') addSource(node, 'rvr1909-lucas', 1, 31, 'Lucas 1:30–31');
    if (nodeName(node) === 'José') {
      addSource(node, 'rvr1909-mateo', 1, 16, 'Mateo 1:16');
      addSource(node, 'rvr1909-lucas', 3, 23, 'Lucas 3:23');
      addSource(node, 'rvr1909-juan', 1, 45, 'Juan 1:45');
    }
    if (nodeName(node) === 'Jesús') {
      addSource(node, 'rvr1909-mateo', 1, 16, 'Mateo 1:16');
      addSource(node, 'rvr1909-romanos', 1, 3, 'Pablo · Romanos 1:3');
    }
  });
  tree.querySelectorAll('.tree-family-sibling').forEach(node => {
    const name = node.firstChild.textContent.trim();
    const sources = {
      'Caín': [4, 1], 'Abel': [4, 2], 'Cam': [5, 32], 'Jafet': [5, 32],
      'Ismael': [16, 15], 'Esaú': [25, 25], 'Leví': [29, 34], 'José': [30, 24]
    };
    const source = sources[name];
    if (source) addSource(node, 'rvr1909-genesis', source[0], source[1], `Génesis ${source[0]}:${source[1]}`);
  });
  tree.querySelectorAll('.tree-other-sons-list > span').forEach(node => {
    const name = node.firstChild.textContent.trim();
    if (name.startsWith('Awán') || name.startsWith('Azura') || name.startsWith('Otros nueve')) {
      const verse = name.startsWith('Awán') ? 9 : name.startsWith('Azura') ? 8 : 10;
      addSource(node, 'etiope-jubileos', 4, verse, `Jubileos 4:${verse}`);
      return;
    }
    const jacobChildren = {
      'Rubén': [29, 32], 'Simeón': [29, 33], 'Dan': [30, 6], 'Neftalí': [30, 8],
      'Gad': [30, 11], 'Aser': [30, 13], 'Isacar': [30, 18], 'Zabulón': [30, 20],
      'Benjamín': [35, 18], 'Dina · hermana': [30, 21]
    };
    const source = jacobChildren[name];
    if (source) addSource(node, 'rvr1909-genesis', source[0], source[1], `Génesis ${source[0]}:${source[1]}`);
    if (['Miriam', 'Aarón', 'Moisés'].includes(name)) addSource(node, 'rvr1909-numeros', 26, 59, 'Números 26:59');
    if (node.closest('.tree-david-disclosure')) {
      addSource(node, 'rvr1909-2-samuel', ['Amnón','Quileab','Absalón','Adonías','Sefatías','Itream'].includes(name) ? 3 : 5,
        ['Amnón','Quileab','Absalón','Adonías','Sefatías','Itream'].includes(name) ? 2 : 14,
        ['Amnón','Quileab','Absalón','Adonías','Sefatías','Itream'].includes(name) ? '2 Samuel 3:2–5' : '2 Samuel 5:14–16');
    }
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
  tree.addEventListener('toggle', positionDates, true);
  document.fonts?.ready.then(positionDates);
}
