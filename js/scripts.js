(() => {
    'use strict';

    const root = document.documentElement;
    const themeStorageKey = 'webmatte-theme-v1';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const themeButtons = [...document.querySelectorAll('.theme-toggle')];

    const savedTheme = () => {
        try {
            return localStorage.getItem(themeStorageKey);
        } catch (_) {
            return null;
        }
    };

    const applyTheme = (theme, persist = false) => {
        const nextTheme = theme === 'dark' ? 'dark' : 'light';
        root.dataset.theme = nextTheme;
        themeColor?.setAttribute('content', nextTheme === 'dark' ? '#102332' : '#087f8c');
        themeButtons.forEach((button) => {
            button.setAttribute('aria-pressed', String(nextTheme === 'dark'));
            button.setAttribute('aria-label', nextTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
        });
        if (persist) {
            try {
                localStorage.setItem(themeStorageKey, nextTheme);
            } catch (_) {
                // O tema continua funcionando mesmo se o armazenamento estiver indisponível.
            }
        }
    };

    applyTheme(root.dataset.theme);
    themeButtons.forEach((button) => button.addEventListener('click', () => {
        applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    }));

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    colorScheme.addEventListener?.('change', (event) => {
        if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light');
    });

    // Barreira apenas visual: em sites estáticos o navegador sempre recebe os arquivos-fonte.
    document.addEventListener('contextmenu', (event) => event.preventDefault(), { capture: true });
    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        const controlShortcut = event.ctrlKey || event.metaKey;
        const developerToolsShortcut = event.key === 'F12'
            || (controlShortcut && event.shiftKey && ['i', 'j', 'c'].includes(key))
            || (event.metaKey && event.altKey && ['i', 'j', 'c'].includes(key));
        const viewSourceShortcut = controlShortcut && key === 'u';

        if (!developerToolsShortcut && !viewSourceShortcut) return;
        event.preventDefault();
        event.stopImmediatePropagation();
    }, { capture: true });

    const drawer = document.querySelector('.mobile-drawer');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const menuBackdrop = document.querySelector('.mobile-drawer__backdrop');
    let focusBeforeDrawer = null;

    const openDrawer = () => {
        if (!drawer || !menuToggle) return;
        focusBeforeDrawer = document.activeElement;
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('is-locked');
        menuClose?.focus();
    };

    const closeDrawer = (restoreFocus = true) => {
        if (!drawer || !menuToggle) return;
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('is-locked');
        if (restoreFocus && focusBeforeDrawer instanceof HTMLElement) focusBeforeDrawer.focus();
    };

    menuToggle?.addEventListener('click', openDrawer);
    menuClose?.addEventListener('click', () => closeDrawer());
    menuBackdrop?.addEventListener('click', () => closeDrawer());
    drawer?.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', () => closeDrawer(false)));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && drawer?.classList.contains('is-open')) closeDrawer();
    });

    const topNavLinks = [...document.querySelectorAll('.top-nav a[href^="#"]')];
    const observedSections = topNavLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && observedSections.length) {
        const navigationObserver = new IntersectionObserver((entries) => {
            const activeEntry = entries.find((entry) => entry.isIntersecting);
            if (!activeEntry) return;
            topNavLinks.forEach((link) => {
                if (link.getAttribute('href') === `#${activeEntry.target.id}`) link.setAttribute('aria-current', 'true');
                else link.removeAttribute('aria-current');
            });
        }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });
        observedSections.forEach((section) => navigationObserver.observe(section));
    }

    document.querySelectorAll('.faq-list details').forEach((details) => {
        details.addEventListener('toggle', () => {
            if (!details.open) return;
            document.querySelectorAll('.faq-list details[open]').forEach((other) => {
                if (other !== details) other.open = false;
            });
        });
    });

    const revealItems = [...document.querySelectorAll('[data-reveal]')];
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    document.querySelectorAll('[data-current-year]').forEach((item) => {
        item.textContent = String(new Date().getFullYear());
    });

    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const formMessage = document.getElementById('formMessage');

    const showFormMessage = (message, type) => {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = `form-message is-${type}`;
        formMessage.hidden = false;
    };

    contactForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!submitButton || !formMessage) return;

        const originalButtonContent = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando…';
        contactForm.setAttribute('aria-busy', 'true');
        formMessage.hidden = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error('Falha no envio');

            showFormMessage('Mensagem enviada com sucesso. Entraremos em contato em breve.', 'success');
            contactForm.reset();
        } catch (_) {
            showFormMessage('Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonContent;
            contactForm.removeAttribute('aria-busy');
        }
    });

    window.addEventListener('load', () => {
        if (window.VLibras?.Widget) new window.VLibras.Widget('https://vlibras.gov.br/app');
    });
})();
