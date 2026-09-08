// js\action.js

function navigateTo(pageId, anchorId = null) {
    const pageFile = pageId === 'home' ? 'index.html' : `${pageId}.html`;
    const anchor = anchorId ? `#anchor-${anchorId}` : '';
    window.location.href = `${pageFile}${anchor}`;
}

function normalizeNavigation() {
    const pageMap = {
        home: 'index.html',
        about: 'about.html',
        solutions: 'solutions.html',
        resources: 'resources.html',
        contact: 'contact.html'
    };
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('a[onclick*="navigateTo"]').forEach(link => {
        const match = link.getAttribute('onclick').match(/navigateTo\('([^']+)'(?:,\s*'([^']+)')?/);
        if (!match || !pageMap[match[1]]) return;

        const anchor = match[2] ? `#anchor-${match[2]}` : '';
        link.href = `${pageMap[match[1]]}${anchor}`;
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        const pageId = link.id.replace('nav-', '');
        const isCurrent = pageMap[pageId] === currentPage;
        link.classList.toggle('text-qiz-glow', isCurrent);
        link.classList.toggle('text-qiz-muted', !isCurrent);
    });
}

// 行動裝置選單切換開關
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');

    menu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

// 初始化動態星空背景
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = [];
    const starCount = 120;

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.01 + 0.005
        });
    }

    function animateStarfield() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0) {
                star.speed = -star.speed;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${Math.abs(star.alpha) * 0.6})`;
            ctx.fill();
        });

        requestAnimationFrame(animateStarfield);
    }

    animateStarfield();
}

// 主題切換功能 (深色 / 淺色)
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    updateThemeIcons();
}

// 更新主題圖示顯示 (太陽 / 月亮)
function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');

    if (!sunIcon || !moonIcon) return;

    if (isDark) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// 頁面載入後自動初始圖示
document.addEventListener('DOMContentLoaded', () => {
    normalizeNavigation();
    updateThemeIcons();
    initStarfield();
});
