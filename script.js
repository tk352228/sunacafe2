// モバイルメニュー開閉（hidden属性で制御）
const btn = document.getElementById('hambtn');
const panel = document.getElementById('menupanel');

const updateLabel = () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
};

btn?.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const next = !expanded;
    btn.setAttribute('aria-expanded', String(next));
    panel.hidden = !next;
    updateLabel();
});

// パネル内のリンクを押したら閉じる
panel?.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest && target.closest('a')) {
        btn.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
        updateLabel();
    }
});

// Escキーで閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
        updateLabel();
    }
});

// 画面幅が広がったら状態をリセット
const mq = window.matchMedia('(min-width: 840px)');
const handleChange = () => {
    if (mq.matches) {
        btn.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
        updateLabel();
    }
};
mq.addEventListener('change', handleChange);
