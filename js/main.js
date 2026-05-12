// бургер меню
function initMenu() {
  var button = document.getElementById('menuToggle');
  var menu = document.getElementById('siteNav');

  if (button && menu) {
    button.addEventListener('click', function () {
      if (menu.className.indexOf('is-open') === -1) {
        menu.className = menu.className + ' is-open';
      } else {
        menu.className = menu.className.replace(' is-open', '');
      }
    });
  }
}

// фильтр товаров
function initProducts() {
  var buttonProducts = document.getElementById('showProducts');
  if (buttonProducts) {
    var newButton = buttonProducts.cloneNode(true);
    buttonProducts.parentNode.replaceChild(newButton, buttonProducts);
    newButton.addEventListener('click', showCategory);
  }
}

function showCategory() {
  var select = document.getElementById('filterSelect');
  var cards = document.querySelectorAll('#catalog-list .product');
  
  if (!cards.length) return;
  
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove('active-card');
  }
  
  if (select.value === 'all') {
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.add('active-card');
    }
  } else {
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].classList.contains(select.value)) {
        cards[i].classList.add('active-card');
      }
    }
  }
}

// загрузка товаров на продукции
function loadProductsFromXML() {
  var xmlUrl = '/kurs-/data/company.xml';
  console.log('1. Пытаюсь загрузить XML по адресу:', xmlUrl);
  
  fetch(xmlUrl)
    .then(function(response) {
      console.log('2. Статус ответа:', response.status);
      if (!response.ok) {
        throw new Error('HTTP ошибка: ' + response.status);
      }
      return response.text();
    })
    .then(function(xmlString) {
      console.log('3. XML загружен, первые 100 символов:', xmlString.substring(0, 100));
      
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      var parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        console.error('4. Ошибка парсинга XML:', parserError.textContent);
        throw new Error('Ошибка парсинга XML');
      }
      
      var items = xmlDoc.getElementsByTagName('item');
      console.log('5. Найдено товаров в XML:', items.length);
      
      var container = document.getElementById('catalog-list');
      if (!container) {
        console.error('6. Контейнер catalog-list не найден!');
        return;
      }
      
      container.innerHTML = '';
      
      for (var i = 0; i < items.length; i++) {
        var category = items[i].getAttribute('category');
        var name = items[i].getElementsByTagName('name')[0].textContent;
        var description = items[i].getElementsByTagName('description')[0].textContent;
        var price = items[i].getElementsByTagName('price')[0].textContent;
        var icon = items[i].getElementsByTagName('icon')[0].textContent;
        
        var imageTag = items[i].getElementsByTagName('image');
        var image = '';
        if (imageTag.length > 0 && imageTag[0].textContent) {
          image = imageTag[0].textContent;
          console.log('   Товар ' + i + ' фото: ' + image);
        }
        
        var card = document.createElement('article');
        card.className = 'card product-card product ' + category + ' active-card';
        
        if (image) {
          card.style.backgroundImage = 'url(' + image + ')';
          card.style.backgroundSize = 'cover';
          card.style.backgroundPosition = 'center';
          card.style.minHeight = '320px';
          card.style.position = 'relative';
        }
        
        card.innerHTML = `
          ${image ? '<div class="card-overlay"></div>' : ''}
          <div class="product-icon" ${image ? 'style="position:relative; z-index:2;"' : ''}>${icon}</div>
          <h3 ${image ? 'style="position:relative; z-index:2; color:white;"' : ''}>${name}</h3>
          <p ${image ? 'style="position:relative; z-index:2; color:rgba(255,255,255,0.9);"' : ''}>${description}</p>
          <strong ${image ? 'style="position:relative; z-index:2; color:#d98b2b;"' : ''}>${price}</strong>
        `;
        
        container.appendChild(card);
        console.log('   Товар ' + i + ' "' + name + '" добавлен в контейнер');
      }
      
      console.log('7. Всего создано карточек:', container.children.length);
      initProducts();
    })
    .catch(function(error) {
      console.error('ОШИБКА:', error.message);
      var container = document.getElementById('catalog-list');
      if (container) {
        container.innerHTML = '<p style="color: red; text-align: center;">Ошибка загрузки: ' + error.message + '</p>';
      }
    });
}

// популярные товары на главной
function loadHomeProducts() {
  var xmlUrl = '/kurs-/data/company.xml';
  console.log('Главная: загружаю XML по адресу:', xmlUrl);
  
  fetch(xmlUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('HTTP ошибка: ' + response.status);
      }
      return response.text();
    })
    .then(function(xmlString) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      var items = xmlDoc.getElementsByTagName('item');
      
      var container = document.getElementById('home-products');
      if (!container) return;
      
      container.innerHTML = '';
      
      var count = Math.min(3, items.length);
      
      for (var i = 0; i < count; i++) {
        var category = items[i].getAttribute('category');
        var name = items[i].getElementsByTagName('name')[0].textContent;
        var description = items[i].getElementsByTagName('description')[0].textContent;
        var price = items[i].getElementsByTagName('price')[0].textContent;
        var icon = items[i].getElementsByTagName('icon')[0].textContent;
        
        var imageTag = items[i].getElementsByTagName('image');
        var image = '';
        if (imageTag.length > 0 && imageTag[0].textContent) {
          image = imageTag[0].textContent;
        }
        
        var card = document.createElement('article');
        card.className = 'card product-card';
        
        if (image) {
          card.style.backgroundImage = 'url(' + image + ')';
          card.style.backgroundSize = 'cover';
          card.style.backgroundPosition = 'center';
          card.style.minHeight = '280px';
          card.style.position = 'relative';
        }
        
        card.innerHTML = `
          ${image ? '<div class="card-overlay"></div>' : ''}
          <div class="product-icon" ${image ? 'style="position:relative; z-index:2;"' : ''}>${icon}</div>
          <h3 ${image ? 'style="position:relative; z-index:2; color:white;"' : ''}>${name}</h3>
          <p ${image ? 'style="position:relative; z-index:2; color:rgba(255,255,255,0.9);"' : ''}>${description}</p>
          <strong ${image ? 'style="position:relative; z-index:2; color:#d98b2b;"' : ''}>${price}</strong>
        `;
        
        container.appendChild(card);
      }
      console.log('Главная: добавлено товаров:', container.children.length);
    })
    .catch(function(error) {
      console.error('Главная ошибка:', error.message);
      var container = document.getElementById('home-products');
      if (container) {
        container.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить товары: ' + error.message + '</p>';
      }
    });
}

// форма
function initForm() {
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', sendMessage);
  }
}

function sendMessage(event) {
  var name = document.getElementById('name');
  var result = document.getElementById('resultMessage');
  event.preventDefault();
  result.innerHTML = 'Спасибо, ' + name.value + '. Ваша заявка принята.';
}

// Запуск
window.onload = function () {
  console.log('Страница загружена, запускаем функции...');
  initMenu();
  initForm();
  
  if (document.getElementById('catalog-list')) {
    console.log('Найдена страница продукции, загружаем товары...');
    loadProductsFromXML();
  }
  
  if (document.getElementById('home-products')) {
    console.log('Найдена главная страница, загружаем популярные товары...');
    loadHomeProducts();
  }
};
