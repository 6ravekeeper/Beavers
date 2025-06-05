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
