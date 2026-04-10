(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Immediate application to HTML element (available even in <head>)
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }

    function updateButtonText(btn, theme) {
        if (!btn) return;
        btn.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }

    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'light';

        // Also sync body class if needed for existing CSS selectors
        if (currentTheme === 'dark' && document.body) {
            document.body.classList.add('dark-mode');
        }

        if (themeToggle) {
            updateButtonText(themeToggle, currentTheme);
            themeToggle.onclick = function() {
                const isDark = document.documentElement.classList.toggle('dark-mode');
                if (document.body) {
                    document.body.classList.toggle('dark-mode', isDark);
                }
                const newTheme = isDark ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                updateButtonText(this, newTheme);
            };
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
