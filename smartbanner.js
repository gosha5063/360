
    async function fetchDataAndUpdateElements(url,name,href,erid) {
    try {

    // const url = 'https://smartbanners24.ru/localhost?getImg?t=' + Date.now() + "?id=" + id;

    const response = await fetch(url,{ cache: 'no-store' });

    if (!response.ok) {
    throw new Error('Ошибка сети: ' + response.status);
}
    const data = await response.json();


    // Обновляем элементы, используя данные из JSON
    href.textContent = data.company_href;
    name.textContent = data.company_name;
    img.src = data.imageUrl;
    erid.textContent = data.erid;
    // Если в JSON есть URL изображения:


} catch (error) {
    console.error('Произошла ошибка:', error);
    // Обработка ошибки, например, отображение сообщения об ошибке на странице
}
}

    // Вызываем функцию для получения данных и обновления элементов
    fetchDataAndUpdateElements();
    const banner1 = document.getElementById('banner1');
    const banner2 = document.getElementById('banner2');

    function updateBanner(banner,id) {
    // Загрузка изображения
    const img = document.createElement('img');

    const url = 'https://smartbanners24.ru/localhost?getJson?t=' + Date.now() + "?id=" + id; // Добавляем временную метку
    img.src = 'https://smartbanners24.ru/localhost?getImg?t=' + Date.now() + "?" + id; // Добавляем временную метку

    const eridCode = document.createElement('div');
    const companyLink = document.createElement('a');
    companyLink.href = 'https://www.company.com';
    companyLink.target = '_blank';
    companyLink.textContent = 'Перейти на сайт компании';


    const companyName = document.createElement('div');
    companyName.textContent = 'Название компании: Компания АБВ';
    fetchDataAndUpdateElements(url,companyName,companyLink,eridCode)


    img.onload = function() {
    // Очистка баннера
    banner.innerHTML = '';

    // Создание контейнера с точками
    const dotContainer = document.createElement('div');
    dotContainer.classList.add('dot-container');

    // Создание точек
    for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dotContainer.appendChild(dot);
}

    // Добавление метки "Реклама"
    const adLabel = document.createElement('span');
    adLabel.classList.add('ad-label');
    adLabel.textContent = 'Реклама';
    dotContainer.appendChild(adLabel);

    // Создание всплывающего баннера
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Контент всплывающего баннера
    overlay.appendChild(eridCode);


    overlay.appendChild(companyName);


    overlay.appendChild(companyLink);

    // Обработчики событий для наведения
    dotContainer.addEventListener('mouseenter', function(event) {
    overlay.style.display = 'flex';
});

    function hideOverlay() {
    overlay.style.display = 'none';
}

    dotContainer.addEventListener('mouseleave', function(event) {
    setTimeout(function() {
    if (!overlay.matches(':hover')) {
    hideOverlay();
}
}, 10);
});

    overlay.addEventListener('mouseleave', function(event) {
    setTimeout(function() {
    if (!dotContainer.matches(':hover')) {
    hideOverlay();
}
}, 10);
});

    // Добавление изображения
    banner.appendChild(img);
    // Добавление контейнера с точками
    banner.appendChild(dotContainer);
    // Добавление всплывающего баннера
    banner.appendChild(overlay);
};

    // Обработка ошибки загрузки
    img.onerror = function() {
    console.error('Ошибка загрузки изображения');
    // Вы можете добавить обработку ошибки, например, показать сообщение пользователю
};
}

    // Вызов функции при загрузке страницы
    updateBanner(banner1,1);
    updateBanner(banner2,2);
    // Интервал обновления изображения
    setInterval(updateBanner, 2000,banner1,1);
    setInterval(updateBanner, 2000,banner2,2);
    startTime();



