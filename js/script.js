document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const modal = document.getElementById('modal');
    const successModal = document.getElementById('successModal');
    const openModalBtns = document.querySelectorAll('#openModalBtn, #heroRequestBtn, #mobileModalBtn, #calcOrderBtn');
    const closeModalBtn = document.querySelector('.modal__close');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    const mainForm = document.getElementById('mainForm');
    const modalForm = document.getElementById('modalForm');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const servicesSection = document.getElementById('services');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    // КАЛЬКУЛЯТОР
    const staffRange = document.getElementById('staffRange');
    const staffValue = document.getElementById('staffValue');
    const pentestNeed = document.getElementById('pentestNeed');
    const priceResult = document.getElementById('priceResult');

    function updatePrice() {
        let staff = parseInt(staffRange.value);
        let basePrice = staff * 1500;
        let pentest = parseInt(pentestNeed.value);
        let total = basePrice + pentest;
        priceResult.innerHTML = 'от ' + total.toLocaleString() + ' ₽';
    }

    if (staffRange) {
        staffRange.addEventListener('input', function() {
            staffValue.innerText = this.value;
            updatePrice();
        });
    }
    if (pentestNeed) pentestNeed.addEventListener('change', updatePrice);
    if (typeof updatePrice === 'function') updatePrice();

    // ФУНКЦИЯ УСПЕХА
    function showSuccessModal() {
        if (successModal) successModal.style.display = 'flex';
    }
    function closeSuccessModal() {
        if (successModal) successModal.style.display = 'none';
    }
    if (closeSuccessBtn) closeSuccessBtn.onclick = closeSuccessModal;

    // ЗАКРЫТИЕ ПО ФОНУ
    window.onclick = function(event) {
        if (event.target === successModal) closeSuccessModal();
        if (event.target === modal) modal.style.display = 'none';
    };

    // ОТКРЫТИЕ МОДАЛКИ
    openModalBtns.forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            if (modal) modal.style.display = 'flex';
        };
    });
    if (closeModalBtn) closeModalBtn.onclick = function() {
        if (modal) modal.style.display = 'none';
    };

    // ВАЛИДАЦИЯ ТЕЛЕФОНА
    function isValidPhone(phone) {
        return phone.trim().length >= 10;
    }

    // ГЛАВНАЯ ФОРМА
    if (mainForm) {
        mainForm.onsubmit = function(e) {
            e.preventDefault();
            const name = document.getElementById('mainName').value.trim();
            const phone = document.getElementById('mainPhone').value.trim();
            if (!name) { alert('Укажите ваше имя'); return; }
            if (!isValidPhone(phone)) { alert('Укажите корректный телефон (10+ цифр)'); return; }
            mainForm.reset();
            showSuccessModal();
        };
    }

    // МОДАЛЬНАЯ ФОРМА
    if (modalForm) {
        modalForm.onsubmit = function(e) {
            e.preventDefault();
            const name = document.getElementById('modalName').value.trim();
            const phone = document.getElementById('modalPhone').value.trim();
            if (!name) { alert('Укажите ваше имя'); return; }
            if (!isValidPhone(phone)) { alert('Укажите корректный телефон'); return; }
            modalForm.reset();
            if (modal) modal.style.display = 'none';
            showSuccessModal();
        };
    }

    // ПЛАВНЫЙ СКРОЛЛ
    if (learnMoreBtn && servicesSection) {
        learnMoreBtn.onclick = function() {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        };
    }

    // МОБИЛЬНОЕ МЕНЮ
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.onclick = function() {
            const isOpen = mobileNav.style.display === 'flex';
            mobileNav.style.display = isOpen ? 'none' : 'flex';
        };
    }

    // FAQ АККОРДЕОН
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        }
    });

    // ===== СКРЫТИЕ ШАПКИ ПРИ СКРОЛЛЕ =====
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.add('hide');
            } else {
                header.classList.remove('hide');
            }
            lastScrollY = currentScrollY;
        });
    }
});