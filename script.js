    // モバイルメニュー開閉（hidden属性で制御）
    const btn = document.getElementById('hambtn');
    const panel = document.getElementById('menupanel');

    if (btn && panel) {
    const firstLink = panel.querySelector('a');

    const isOpen = () => btn.getAttribute('aria-expanded') === 'true';

    const updateLabel = () => {
        btn.setAttribute('aria-label', isOpen() ? 'メニューを閉じる' : 'メニューを開く');
    };

    const setOpen = (open) => {
        btn.setAttribute('aria-expanded', String(open));
        panel.hidden = !open;
        document.body.classList.toggle('no-scroll', open);
        updateLabel();
        if (open) { firstLink && firstLink.focus(); } else { btn.focus(); }
    };

    // トグル
    btn.addEventListener('click', () => setOpen(!isOpen()));

    // パネル内のリンクを押したら閉じる
    panel.addEventListener('click', (e) => {
        const t = e.target;
        if (t.closest && t.closest('a')) setOpen(false);
    });

    // パネル外クリックで閉じる
    document.addEventListener('click', (e) => {
        if (!isOpen()) return;
        if (!panel.contains(e.target) && e.target !== btn) setOpen(false);
    });

    // Escキーで閉じる（開いている時のみ）
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) setOpen(false);
    });

    // 画面幅が広がったら状態をリセット
    const mq = window.matchMedia('(min-width: 840px)');
    const handleChange = () => { if (mq.matches) setOpen(false); };

    if (mq.addEventListener) mq.addEventListener('change', handleChange);
    else if (mq.addListener) mq.addListener(handleChange); // Safari 旧版対策

    // 初期ラベル同期
    updateLabel();
    }
