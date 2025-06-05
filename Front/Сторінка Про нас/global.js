document.getElementById('order-button').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('scrollToOrder', 'true');
    window.location.href = "../Головна сторінка/index.html#section-order";
  });