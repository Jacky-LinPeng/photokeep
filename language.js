(() => {
  const menu = document.getElementById('language-select');
  const supported = Array.from(menu.options, option => option.value);
  const match = language => {
    const tag = language.toLowerCase();
    if (tag.startsWith('zh')) {
      const parts = tag.replaceAll('_', '-').split('-');
      if (parts.includes('hant')) return 'zh-Hant';
      if (parts.includes('hans')) return 'zh-Hans';
      return parts.some(part => ['tw', 'hk', 'mo'].includes(part)) ? 'zh-Hant' : 'zh-Hans';
    }
    if (tag.startsWith('pt')) return 'pt-BR';
    return supported.find(code => code.toLowerCase() === tag) || supported.find(code => code === tag.split('-')[0]);
  };
  menu.addEventListener('change', () => {
    try { localStorage.setItem('snaptrim.language', menu.value); } catch (_) {}
    window.location.assign(window.siteBase + menu.value + '/' + window.siteRoute);
  });
  if (window.siteRoot) {
    let saved;
    try { saved = localStorage.getItem('snaptrim.language'); } catch (_) {}
    const preferred = (supported.includes(saved) && saved) || (navigator.languages || [navigator.language]).map(match).find(Boolean) || 'en';
    if (preferred !== 'en') {
      const link = document.getElementById('recommended-link');
      link.href = window.siteBase + preferred + '/' + window.siteRoute;
      link.textContent = Array.from(menu.options).find(option => option.value === preferred).textContent;
      document.getElementById('language-recommendation').hidden = false;
    }
  }
})();
