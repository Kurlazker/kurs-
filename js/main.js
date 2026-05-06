window.onload = function () {
  initMenu();
  initProducts();
  initForm();
};

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

function initProducts() {
  var buttonProducts = document.getElementById('showProducts');

  if (buttonProducts) {
    buttonProducts.addEventListener('click', showCategory);
  }
}

function showCategory() {
  var select = document.getElementById('filterSelect');
  var cards = document.querySelectorAll('.product');
  var i;

  for (i = 0; i < cards.length; i = i + 1) {
    cards[i].className = cards[i].className.replace(' active-card', '');
  }

  if (select.value === 'all') {
    for (i = 0; i < cards.length; i = i + 1) {
      cards[i].className = cards[i].className + ' active-card';
    }
  }

  if (select.value === 'metal') {
    activeByClass('metal');
  }

  if (select.value === 'machining') {
    activeByClass('machining');
  }

  if (select.value === 'welding') {
    activeByClass('welding');
  }
}

function activeByClass(nameClass) {
  var elements = document.querySelectorAll('.' + nameClass);
  var i;

  for (i = 0; i < elements.length; i = i + 1) {
    elements[i].className = elements[i].className + ' active-card';
  }
}

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
