const prevTheme = JSON.parse(localStorage.getItem('theme') ?? '"dark"');
if (prevTheme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.style.setProperty('color-scheme', 'dark');
}
