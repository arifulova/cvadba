// Таймер обратного отсчета (1 августа 2026)
function updateCountdown() {
    const weddingDate = new Date("August 1, 2026 15:00:00").getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Открытие карты с адресом ресторана
function openMap() {
    const address = encodeURIComponent("ул. Крупской, 56, Белорецк, Республика Башкортостан");
    window.open(`https://maps.google.com/?q=${address}`, '_blank');
}

// Отправка данных в ВКонтакте (через создание ссылки для сообщения)
function sendToVK(data) {
    const vkUrl = "https://vk.ru/kosarevavn";
    
    // Формируем текст сообщения
    let message = "🕊️ НОВАЯ ЗАЯВКА НА СВАДЬБУ 🕊️\n\n";
    message += `👤 Гость: ${data.name}\n`;
    message += `📌 Присутствие: ${data.attendanceText}\n`;
    message += `🍷 Предпочтения по напиткам: ${data.drinksText || "Не указаны"}\n`;
    message += `⏰ Отправлено: ${data.date}\n\n`;
    message += `💝 Ссылка на ответ: ${vkUrl}`;
    
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Создаём ссылку для отправки сообщения ВК
    // Используем стандартный метод отправки сообщений ВК
    const vkMessageUrl = `https://vk.com/write-${vkUrl.split('/').pop()}?message=${encodedMessage}`;
    
    // Открываем ВК с предзаполненным сообщением
    window.open(vkMessageUrl, '_blank');
}

// Обработка формы RSVP
const form = document.getElementById('rsvpForm');
const messageDiv = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        
        // Блокируем кнопку на время отправки
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ОТПРАВКА...';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showMessage('✅ Спасибо! Ваш ответ успешно отправлен!', 'success');
                form.reset();
                
                // Перенаправление через 3 секунды
                setTimeout(() => {
                    window.location.href = form.querySelector('input[name="_next"]').value;
                }, 3000);
            } else {
                showMessage('❌ Ошибка отправки. Попробуйте ещё раз или напишите нам в VK.', 'error');
            }
        } catch (error) {
            showMessage('❌ Ошибка соединения. Проверьте интернет и попробуйте снова.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ОТПРАВИТЬ';
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    });
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
}

// Плавное появление элементов
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

console.log('🎉 Добро пожаловать на свадебный сайт Данилы и Вероники! 🎉');