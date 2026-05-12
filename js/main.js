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
  
  fetch(xmlUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Ошибка загрузки: ' + response.status);
      }
      return response.text();
    })
    .then(function(xmlString) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      var items = xmlDoc.getElementsByTagName('item');
      
      var container = document.getElementById('catalog-list');
      if (!container) return;
      
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
      }
      
      initProducts();
    })
    .catch(function(error) {
      console.error('Ошибка:', error);
      var container = document.getElementById('catalog-list');
      if (container) {
        container.innerHTML = '<p style="color: red; text-align: center;">Ошибка загрузки данных</p>';
      }
    });
}

// популярные товары на главной
function loadHomeProducts() {
  var xmlUrl = '/kurs-/data/company.xml';
  
  fetch(xmlUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Ошибка загрузки: ' + response.status);
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
    })
    .catch(function(error) {
      console.error('Ошибка загрузки товаров на главную:', error);
      var container = document.getElementById('home-products');
      if (container) {
        container.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить товары</p>';
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
  initMenu();
  initForm();
  
  if (document.getElementById('catalog-list')) {
    loadProductsFromXML();
  }
  
  if (document.getElementById('home-products')) {
    loadHomeProducts();
  }
};
