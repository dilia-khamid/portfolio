// Структура данных для наград/достижений
const achievements = [
    {
        name: '🏆 Первый проект',
        description: 'Успешно завершен первый проект в компании',
        backgroundUrl: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        name: '⭐ Наставник года',
        description: 'Получил награду "Наставник года" за помощь новым сотрудникам',
        backgroundUrl: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        name: '🎯 Цель достигнута',
        description: 'Превысил все KPI за квартал на 150%',
        backgroundUrl: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        name: '💡 Инноватор',
        description: 'Предложил и внедрил инновационное решение, сократившее время разработки на 30%',
        backgroundUrl: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        name: '🚀 Быстрый старт',
        description: 'Завершил онбординг и начал работу в рекордно короткие сроки',
        backgroundUrl: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        name: '🎓 Сертификат',
        description: 'Получил профессиональный сертификат DevOps',
        backgroundUrl: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    {
        name: '🤝 Командный игрок',
        description: 'Признан лучшим командным игроком месяца',
        backgroundUrl: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
        name: '🔥 Выжигатель багов',
        description: 'Нашел и исправил критическую ошибку в продакшене',
        backgroundUrl: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
        name: '📊 Аналитик',
        description: 'Провел глубокий анализ системы и оптимизировал производительность',
        backgroundUrl: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
        name: '🌟 Звезда месяца',
        description: 'Выбран звездой месяца по итогам голосования коллег',
        backgroundUrl: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)'
    },
    {
        name: '🎨 Креативщик',
        description: 'Разработал креативное решение для сложной технической задачи',
        backgroundUrl: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    },
    {
        name: '⚡ Скорость',
        description: 'Выполнил срочную задачу в два раза быстрее планового срока',
        backgroundUrl: 'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)'
    }
];

// Данные для паспорта навыков
const skills = [
    { name: 'Управление продуктом', level: 3 },
    { name: 'Управление проектами', level: 4 },
    { name: 'Финансы и экономика', level: 2 },
    { name: 'Коммуникации', level: 5 },
    { name: 'Работа с информацией', level: 4 },
    { name: 'Управление персоналом', level: 3 },
    { name: 'Информационные технологии', level: 5 },
    { name: 'UX/UI', level: 3 },
    { name: 'Маркетинг и продажи', level: 2 }
];

// Переменные для карусели достижений
let currentPage = 0;
let achievementsPerPage = 6;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    renderSkillsChart();
    renderAchievements();
    updateAchievementsPerPage();

    // Обработчики навигации
    document.getElementById('prevBtn').addEventListener('click', () => navigateAchievements(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigateAchievements(1));

    // Обновление при изменении размера окна
    window.addEventListener('resize', function () {
        updateAchievementsPerPage();
        renderAchievements();
    });
});

// Определение количества достижений на странице в зависимости от ширины экрана
function updateAchievementsPerPage() {
    const width = window.innerWidth;
    if (width < 480) {
        achievementsPerPage = 6; // 2 ряда по 3
    } else if (width < 768) {
        achievementsPerPage = 6; // 2 ряда по 3
    } else if (width < 1024) {
        achievementsPerPage = 6; // 2 ряда по 3
    } else {
        achievementsPerPage = 6; // 2 ряда по 3-4
    }
}

// Отрисовка достижений
function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    const dotsContainer = document.getElementById('achievementsDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    grid.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Вычисляем количество страниц
    const totalPages = Math.ceil(achievements.length / achievementsPerPage);

    // Проверка валидности текущей страницы
    if (currentPage >= totalPages) {
        currentPage = totalPages - 1;
    }
    if (currentPage < 0) {
        currentPage = 0;
    }

    // Показываем кнопки навигации только если страниц больше одной
    if (totalPages > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';

        // Отключаем кнопки на краях
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;

        prevBtn.style.opacity = currentPage === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.3' : '1';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    // Отображаем достижения текущей страницы
    const startIndex = currentPage * achievementsPerPage;
    const endIndex = Math.min(startIndex + achievementsPerPage, achievements.length);

    for (let i = startIndex; i < endIndex; i++) {
        const achievement = achievements[i];
        const achievementElement = createAchievementElement(achievement);
        grid.appendChild(achievementElement);
    }

    // Создаем точки индикации
    if (totalPages > 1) {
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === currentPage ? ' active' : '');
            dot.addEventListener('click', () => {
                currentPage = i;
                renderAchievements();
            });
            dotsContainer.appendChild(dot);
        }
    }
}

// Создание элемента достижения
function createAchievementElement(achievement) {
    const div = document.createElement('div');
    div.className = 'achievement-item';
    div.style.background = achievement.backgroundUrl;

    const icon = document.createElement('div');
    icon.className = 'achievement-icon';
    icon.textContent = achievement.name.split(' ')[0]; // Берем эмодзи

    const tooltip = document.createElement('div');
    tooltip.className = 'achievement-tooltip';
    tooltip.textContent = achievement.description;

    div.appendChild(icon);
    div.appendChild(tooltip);

    return div;
}

// Навигация по достижениям
function navigateAchievements(direction) {
    const totalPages = Math.ceil(achievements.length / achievementsPerPage);
    currentPage += direction;

    if (currentPage < 0) currentPage = 0;
    if (currentPage >= totalPages) currentPage = totalPages - 1;

    renderAchievements();
}

// Отрисовка диаграммы навыков (радар-чарт)
function renderSkillsChart() {
    const container = document.getElementById('skillsChart');
    const size = 280;
    const center = size / 2;
    const maxRadius = size / 2 - 60;
    const levels = 5;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

    // Рисуем концентрические окружности (уровни)
    for (let i = 1; i <= levels; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', center);
        circle.setAttribute('cy', center);
        circle.setAttribute('r', (maxRadius / levels) * i);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#e2e8f0');
        circle.setAttribute('stroke-width', '1');
        svg.appendChild(circle);
    }

    // Рисуем оси
    const angleStep = (Math.PI * 2) / skills.length;
    skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x = center + Math.cos(angle) * maxRadius;
        const y = center + Math.sin(angle) * maxRadius;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', center);
        line.setAttribute('y1', center);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#cbd5e0');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    });

    // Рисуем полигон с данными
    const points = skills.map((skill, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const radius = (maxRadius / levels) * skill.level;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        return `${x},${y}`;
    }).join(' ');

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', points);
    polygon.setAttribute('fill', 'rgba(102, 126, 234, 0.3)');
    polygon.setAttribute('stroke', '#667eea');
    polygon.setAttribute('stroke-width', '2');
    svg.appendChild(polygon);

    // Добавляем точки
    skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const radius = (maxRadius / levels) * skill.level;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#667eea');
        svg.appendChild(circle);
    });

    // Добавляем подписи
    skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const labelRadius = maxRadius + 20;
        const x = center + Math.cos(angle) * labelRadius;
        const y = center + Math.sin(angle) * labelRadius;

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#4a5568');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-weight', '500');

        // Разбиваем длинные названия на строки
        const words = skill.name.split(' ');
        if (words.length > 1) {
            const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan1.setAttribute('x', x);
            tspan1.setAttribute('dy', '-6');
            tspan1.textContent = words[0];
            text.appendChild(tspan1);

            const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan2.setAttribute('x', x);
            tspan2.setAttribute('dy', '12');
            tspan2.textContent = words.slice(1).join(' ');
            text.appendChild(tspan2);
        } else {
            text.textContent = skill.name;
        }

        svg.appendChild(text);
    });

    container.appendChild(svg);
}
