// js\action.js

function navigateTo(pageId, anchorId = null) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(`page-${pageId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('text-qiz-glow');
        link.classList.add('text-qiz-muted');
    });

    const activeNav = document.getElementById(`nav-${pageId}`);
    if (activeNav) {
        activeNav.classList.remove('text-qiz-muted');
        activeNav.classList.add('text-qiz-glow');
    }

    // 重新初始化 Lucide 圖示，防止動態頁面圖示遺失
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 捲動至頁面頂部或指定的錨點位置 (相容 anchor- 前綴)
    if (anchorId) {
        setTimeout(() => {
            const el = document.getElementById(anchorId) || document.getElementById(`anchor-${anchorId}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

// DOM 載入後初始化 Lucide 圖示與背景動畫
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initStarfield();
});
