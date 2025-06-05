document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("order-form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
      const quantity = document.getElementById("quantity").value;

      const waterTypes = [];
      if (document.getElementById("bottled-water-checkbox").checked) {
        waterTypes.push("bottled");
      }
      if (document.getElementById("jug-water-checkbox").checked) {
        waterTypes.push("jug");
      }

      const orderData = {
        name: name,
        phone: phone,
        address: address,
        quantity: parseInt(quantity),
        water_types: waterTypes
      };

      try {
        const response = await fetch("http://localhost:5000/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        });

        if (response.ok) {
          const result = await response.json();
          alert("Замовлення прийнято!" + result.status);
        } else {
          alert("Помилка при оформленні замовлення.");
        }
      } catch (error) {
        alert("Не вдалося підключитися до сервера.");
        console.error(error);
      }
    });
  }
});

// переход на страницу про нас
document.addEventListener("DOMContentLoaded", function () {
  const aboutLink = document.getElementById("about-link");

  if (aboutLink) {
    aboutLink.addEventListener("click", function (e) {
      e.preventDefault(); // отменяет переход по #
      window.location.href = "../Сторінка про нас/about.html"; // переход на нужную страницу
    });
  }
});


// маска для номера
document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('phone');
  
  const phoneMask = IMask(phoneInput, {
    mask: '+{38} (000) 000-00-00',
    lazy: false, // Маска всегда видна
    placeholderChar: '_', // Символ-заполнитель
    definitions: {
      '0': /[0-9]/ // Разрешаем только цифры
    }
  });

  // Запрет ввода при заполнении
  phoneInput.addEventListener('keydown', function(e) {
    if (phoneMask.masked.isComplete && e.key !== 'Backspace') {
      e.preventDefault();
    }
  });
});

// прокрутка до заказа
document.querySelector('.hero-cta-button').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('order-form').scrollIntoView({
    behavior: 'smooth'
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // проверяем хэш в урле
    if (window.location.hash === '#section-order') {
      scrollToOrderSection();
    }
    
    // проверяем метку в localStorage
    if (localStorage.getItem('scrollToOrder')) {
      scrollToOrderSection();
      localStorage.removeItem('scrollToOrder');
    }

    function scrollToOrderSection() {
      setTimeout(() => {
        const section = document.getElementById('section-order');
        if (section) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 120;
          const offsetPosition = section.offsetTop - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  });