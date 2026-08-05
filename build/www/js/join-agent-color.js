/* build/www/js/join-agent-color.js

Usage:
- Include this script on your join page (adjust path as needed):
  <script src="/build/www/js/join-agent-color.js"></script>
- Call `setAgentImage('#agent-img')` where `#agent-img` is an <img> element shown on the join UI.

Behavior:
- Picks one of eight Bonzi-like colors at random when called.
- Tries to load build/www/img/agents/<color>.webp.
- If the .webp file is missing, falls back to a generated in-memory PNG data URI so the user still sees the color.
*/

(function () {
  const AGENT_COLORS = ['red','orange','yellow','green','blue','purple','cyan','black'];
  const COLOR_HEX = {
    red: '#FF0000',
    orange: '#FF9500',
    yellow: '#FFCC00',
    green: '#33CC33',
    blue: '#2196F3',
    purple: '#6A0DAF',
    cyan: '#00FFFF',
    black: '#000000'
  };

  function pickAgentColor() {
    return AGENT_COLORS[Math.floor(Math.random() * AGENT_COLORS.length)];
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error('load failed'));
      img.src = url;
    });
  }

  function colorDataUri(hex, size = 64) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, size, size);
    return canvas.toDataURL('image/png');
  }

  async function setAgentImage(imgSelectorOrElement) {
    const color = pickAgentColor();
    const relativePath = '/build/www/img/agents/' + color + '.webp';

    const imgEl = typeof imgSelectorOrElement === 'string' ? document.querySelector(imgSelectorOrElement) : imgSelectorOrElement;
    if (!imgEl) return; // nothing to set

    try {
      await loadImage(relativePath);
      imgEl.src = relativePath;
    } catch (e) {
      // fallback to generated PNG data URI so join always shows a color
      imgEl.src = colorDataUri(COLOR_HEX[color] || '#000000');
    }

    // also set a data-color attribute for styling
    imgEl.setAttribute('data-agent-color', color);
  }

  // Expose to global
  window.setAgentImage = setAgentImage;
})();
