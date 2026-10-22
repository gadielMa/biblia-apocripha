const textElement = document.querySelector('#dragon-source-text');

if (textElement) {
  try {
    const response = await fetch('Bel-y-el-Dragon.txt');
    if (!response.ok) throw new Error('No se pudo cargar el texto de Bel y el Dragón.');
    textElement.textContent = await response.text();
  } catch (error) {
    textElement.textContent = 'No se pudo cargar el texto completo. Usá el enlace de descarga para abrir el archivo TXT.';
    console.error(error);
  }
}
