
async function fetchDataAndUpdateElements(url,name,href,erid) {
    try {

        // const url = 'https://smartbanners24.ru/localhost?getImg?t=' + Date.now() + "?id=" + id;

        const response = await fetch(url,{ cache: 'no-store' });

        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }
        const data = await response.json();

        // Обновляем элементы, используя данные из JSON
        name.textContent = data.company_name;
        erid.textContent = data.erid;
        // Если в JSON есть URL изображения:
        return { href: data.company_href }; // Возвращаем объект с новым href


    } catch (error) {
        console.error('Произошла ошибка:', error);
        // Обработка ошибки, например, отображение сообщения об ошибке на странице
    }
}

// Вызываем функцию для получения данных и обновления элементо
const banner1 = document.getElementById('banner1');
const banner2 = document.getElementById('banner');


function updateBanner(banner, id) {
    // Загрузка изображения

    const img = document.createElement('img');

    const url = 'https://smartbanners24.ru/360?getJson?t=' + Date.now() + '?id=' + id; // Добавляем временную метку
    const imgUrl= 'https://smartbanners24.ru/360?getImg?t=' + Date.now() + '?id=' + id; // Добавляем временную метку

    // Создаем элементы для всплывающей информации
    const eridCode = document.createElement('div');
    let companyLink = "https://google.com"
    const companyName = document.createElement('a');


    // Вызываем функцию для получения данных и обновления элементов
    fetchDataAndUpdateElements(url, companyName, companyLink, eridCode)
        .then(result => {

            img.src = imgUrl

            // После получения данных:
            // ...
            companyLink = result.href

            img.onload = function() {



                // Очистка баннера

                banner.innerHTML = '';

                // Создание контейнера с точками
                const dotContainer = document.createElement('div');
                dotContainer.classList.add('dot-container');

                // Создание точек (измените количество, если нужно)
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

                // Добавление контента в overlay
                overlay.appendChild(eridCode);
                overlay.appendChild(companyName);
                // overlay.appendChild(companyLink);

                // Кнопка закрытия
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Закрыть';
                closeButton.classList.add('close-button');
                overlay.appendChild(closeButton);

                // Обработчик клика на контейнер точек
                dotContainer.addEventListener('click', function(event) {
                    overlay.style.display = 'flex';
                    event.stopPropagation(); // Останавливаем распространение события
                });

                // Обработчик клика на кнопку закрытия
                closeButton.addEventListener('click', function() {
                    overlay.style.display = 'none';
                    event.stopPropagation(); // Останавливаем всплытие события
                });

                banner.addEventListener('click', function(event) {
                    if (event.target === closeButton) {
                        return;
                    }

                    // Проверяем, был ли клик по overlay
                    if (event.target === overlay) {
                        return; // Не переходим по ссылке
                    }
                    // Проверяем, был ли клик по кнопке закрытия или overlay
                    if (event.target === closeButton || event.target === overlay) {
                        return; // Не переходим по ссылке
                    }

                    window.open(companyLink, '_blank'); // Открывает ссылку в новой вкладке
                });


                // Добавление изображения, контейнера с точками и overlay в баннер
                banner.appendChild(img);
                banner.appendChild(dotContainer);
                banner.appendChild(overlay);

            };

            // Обработка ошибки загрузки
            img.onerror = function() {
                console.error('Ошибка загрузки изображения');
                // Вы можете добавить обработку ошибки, например, показать сообщение пользователю
            };
        })
        .catch(error => {
            console.error("Ошибка при получении данных:", error);
            // Добавьте обработку ошибки, например, покажите пользователю сообщение об ошибке.
        });
}

// Вызов функции при загрузке страницы
updateBanner(banner1, 1);
updateBanner(banner2, 2);

// Интервал обновления изображения
setInterval(() => {
    updateBanner(banner1, 1);
    updateBanner(banner2, 2);
}, 10000);