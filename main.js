document.addEventListener("DOMContentLoaded", () => {
  const cards = [
    {
      name: "Mercedes-Benz CLA45 AMG Edition 2014 г",
      image: "./assets/wp8599180.webp",
      price: 25000,
      description: "Auto",
      rating: 4.5,
    },
    {
      name: "BMW M3 2020",
      image: "./assets/wp8599180.webp",
      price: 35000,
      description: "Sport Auto",
      rating: 4.7,
    },
    {
      name: "Audi RS7 2019",
      image: "./assets/wp8599180.webp",
      price: 45000,
      description: "Luxury Auto",
      rating: 4.8,
    },
 
  ];

  let products = JSON.parse(localStorage.getItem("products")) || [];

  // ===== Главная страница =====
  const productsContainer = document.querySelector(".products");
  if (productsContainer) {
    const renderProducts = () => {
      productsContainer.innerHTML = "";

      cards.forEach((card, index) => {
        const product = document.createElement("div");
        product.classList.add("product-card");

        const img = document.createElement("img");
        img.classList.add("card-logo");
        img.src = card.image;

        const title = document.createElement("h3");
        title.classList.add("product-title");
        title.innerText = card.name;

        const description = document.createElement("p");
        description.classList.add("product-description");
        description.innerText = card.description;

        const rating = document.createElement("div");
        rating.classList.add("product-rating");
        rating.innerText = "⭐ " + card.rating;

        const price = document.createElement("div");
        price.classList.add("product-price");
        price.innerText = card.price + " $";

        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = products.includes(index) ? "Убрать из корзины" : "В корзину";

        btn.addEventListener("click", () => {
          if (products.includes(index)) {
            products = products.filter(i => i !== index);
          } else {
            products.push(index);
          }
          localStorage.setItem("products", JSON.stringify(products));
          renderProducts();
        });

        product.append(img, title, description, rating, price, btn);
        productsContainer.append(product);
      });
    };

    renderProducts();
  }

  // ===== Страница корзины =====
  const cartList = document.querySelector("#cart-list");
  const cartCount = document.querySelector("#cart-count");
  const cartTotal = document.querySelector("#cart-total");
  const buyBtn = document.querySelector("#buy-btn");


    const renderCart = () => {
      cartList.innerHTML = "";
      let total = 0;

      products.forEach(index => {
        const product = cards[index];

        const li = document.createElement("li");
        li.classList.add("cart-item");

        const title = document.createElement("span");
        title.innerText = product.name;

        const price = document.createElement("span");
        price.innerText = product.price + " $";

        const removeBtn = document.createElement("button");
        removeBtn.innerText = "x";
        removeBtn.addEventListener("click", () => {
          products = products.filter(i => i !== index);
          localStorage.setItem("products", JSON.stringify(products));
          renderCart();
        });

        li.append(title, price, removeBtn);
        cartList.append(li);

        total += product.price;
      });

      if (cartCount) cartCount.innerText = products.length;
      if (cartTotal) cartTotal.innerText = total;
    };

    if (buyBtn) {
      buyBtn.addEventListener("click", () => {
        if (products.length === 0) {
          alert("Корзина пуста");
          return;
        }
        alert("Успешно куплено");
        products = [];
        localStorage.removeItem("products");
        renderCart();
      });
    }

    renderCart();
  }
);
