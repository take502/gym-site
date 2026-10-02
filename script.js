document.addEventListener('DOMContentLoaded', () => {

    // 1. スクロール時のヘッダー背景変更
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('glass-nav');
            header.classList.remove('py-4');
            header.classList.add('py-3');
        } else {
            header.classList.remove('glass-nav');
            header.classList.remove('py-3');
            header.classList.add('py-4');
        }
    });

    // 2. ハンバーガーメニュー開閉
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        menuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('opacity-0');
        mobileMenu.classList.toggle('pointer-events-none');
        document.body.classList.toggle('overflow-hidden');
    };

    menuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 3. FAQ アコーディオン機能
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');

            // Toggle active state
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });

    // 4. フォームの動的バリデーション
    const form = document.getElementById('booking-form');
    const successMsg = document.getElementById('success-msg');

    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        const errorMsg = input.nextElementSibling;
        input.classList.add('border-neonOrange');
        input.classList.remove('border-gray-700');
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
    };

    const clearError = (input) => {
        const errorMsg = input.nextElementSibling;
        input.classList.remove('border-neonOrange');
        input.classList.add('border-gray-700');
        if (errorMsg && errorMsg.classList.contains('error-msg')) {
            errorMsg.classList.add('hidden');
        }
    };

    // リアルタイムに入力エラーを解除
    ['name', 'email', 'phone', 'date'].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', () => clearError(input));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const date = document.getElementById('date');

        // バリデーションチェック
        if (!name.value.trim()) {
            showError('name', 'お名前を入力してください');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError('email', 'メールアドレスを入力してください');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('email', '正しいメールアドレスの形式で入力してください');
            isValid = false;
        }

        const phoneRegex = /^0\d{9,10}$/;
        if (!phone.value.trim()) {
            showError('phone', '電話番号を入力してください');
            isValid = false;
        } else if (!phoneRegex.test(phone.value.replace(/-/g, ''))) {
            showError('phone', '正しい電話番号（ハイフンなし10〜11桁）を入力してください');
            isValid = false;
        }

        if (!date.value) {
            showError('date', 'ご希望日を選択してください');
            isValid = false;
        }

        // 送信成功時
        if (isValid) {
            form.reset();
            form.classList.add('hidden');
            successMsg.classList.remove('hidden');
        }
    });

    // 5. スクロールアニメーション (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
});