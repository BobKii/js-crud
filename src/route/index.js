// Підключаємо технологію express для back-end сервера
const express = require("express");
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router();

// ================================================================

class Product {
  static #list = [];

  static #count = 0;

  constructor(img, title, descriprion, category, price, amount = 0) {
    // this.id = Product.#list.length + 1
    this.id = ++Product.#count;
    this.img = img;
    this.title = title;
    this.descriprion = descriprion;
    this.category = category;
    this.price = price;
    this.amount = amount;
  }

  // static add = (img, title, descriprion, category, price) => {
  //   const newProduct = new Product(img, title, descriprion, category, price);

  //   this.#list.push(newProduct);
  // };

  static add = (...data) => {
    const newProduct = new Product(...data);

    this.#list.push(newProduct);
  };

  static getList = () => {
    return this.#list;
  };

  static getById = (id) => {
    return this.#list.find((product) => product.id === id);
  };

  static getRandomList = (id) => {
    // Фільтруємо товари, щоб вилучити той, з яким порівнюємо id
    const filteredList = this.#list.filter((product) => product.id !== id);

    //Відсортуємо за допомогою Math.random() та перемішаємо масив
    const shuffledList = filteredList.sort(() => Math.random() - 0.5);

    //Повертаємо перші 3 елементи з перемішаного масиву
    return shuffledList.slice(0, 3);
  };
}

Product.add(
  "https://picsum.photos/200/300",
  `Ком'пютер Artline Gaming (X24v11) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3,6 - 4,2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ`,
  [
    { id: 1, text: `Готовий до выдправки` },
    { id: 2, text: `Топ продажів` },
  ],
  27000,
  10
);

Product.add(
  "https://picsum.photos/200/300",
  `Ком'пютер ProLine Business (B112h07) Intel Core i5 9400F/`,
  `Intel Core i5 9400F (2,9 - 4,1 ГГц) / RAM 8 ГБ / HDD 1 ТБ / Intel UHD Graphics 630`,
  [{ id: 2, text: `Топ продажів` }],
  20000,
  10
);

Product.add(
  "https://picsum.photos/200/300",
  `Ком'пютер ProLine Workstation (W514p01) Intel Xeon E-2226G`,
  `Intel Xeon E-2226G (3,4 - 4,7 ГГц) / RAM 16 ГБ / HDD 1 ТБ / nVidia Quatro p620`,
  [{ id: 1, text: `Готовий до выдправки` }],
  34000,
  10
);

Product.add(
  "https://picsum.photos/200/300",
  `2Ком'пютер ProLine Workstation (W514p01) Intel Xeon E-2226G`,
  `Intel Xeon E-2226G (3,4 - 4,7 ГГц) / RAM 16 ГБ / HDD 1 ТБ / nVidia Quatro p620`,
  [{ id: 1, text: `Готовий до выдправки` }],
  35000,
  10
);

Product.add(
  "https://picsum.photos/200/300",
  `3Ком'пютер ProLine Workstation (W514p01) Intel Xeon E-2226G`,
  `Intel Xeon E-2226G (3,4 - 4,7 ГГц) / RAM 16 ГБ / HDD 1 ТБ / nVidia Quatro p620`,
  [{ id: 1, text: `Готовий до выдправки` }],
  39000,
  10
);

class Purchase {
  static DELIVERY_PRICE = 150;
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/alert", function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("alert", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "alert",

    data: {
      message: "Операція успішна",
      info: ["Товар створений", "Операція успішна"],
      link: "/test-path",
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/", function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("purchase-index", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "purchase-index",

    data: {
      // img: "https://picsum.photos/200/300",
      // title: `Ком'пютер Artline Gaming (X24v11) AMD Ryzen 5 3600/`,
      // descriprion: ` AMD Ryzen 5 3600 (3,6 - 4,2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ`,
      // category: [
      //   { id: 1, text: `Готовий до выдправки` },
      //   { id: 2, text: `Топ продажів` },
      // ],
      // price: 27000,

      //
      // message: "Операція успішна",
      // info: ["Товар створений", "Операція успішна"],
      // link: "/test-path",

      list: Product.getList(),
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/purchase-product", function (req, res) {
  // res.render генерує нам HTML сторінку
  const id = Number(req.query.id);

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("purchase-product", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "purchase-product",

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post("/purchase-create", function (req, res) {
  // res.render генерує нам HTML сторінку
  const id = Number(req.query.id);
  const amount = Number(req.body.amount);

  if (amount < 1) {
    return res.render("alert", {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: "alert",

      data: {
        message: "Помилка",
        // info: 'Некоректна кількість товару',
        info: ["Некоректна кількість товару", "Помилка"],
        link: `/purchase-product?id=${id}`,
      },
    });
  }

  const product = Product.getById(id);

  console.log(id, amount);

  if (product.amount < 1) {
    return res.render("alert", {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: "alert",

      data: {
        message: "Помилка",
        // info: 'Некоректна кількість товару',
        info: ["Такої кількості товару немає в наявності", "Помилка"],
        link: `/purchase-product?id=${id}`,
      },
    });
  }

  console.log(product, amount);

  // console.log(reg.body);

  const productPrice = product.price * amount;
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE;

  // ↙️ cюди вводимо назву файлу з сontainer

  res.render("purchase-create", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "purchase-create",

    data: {
      id: product.id,
      cart: [
        {
          text: `${product.title} (${amount} шт.)`,
          price: productPrice,
        },
        {
          text: `Доставка`,
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
    },
  });

  /// !!!непонятно на видео 38:10 куда это вставляется
  // res.render("purchase-product", {
  //   // вказуємо назву папки контейнера, в якій знаходяться наші стилі
  //   style: "purchase-product",

  //   data: {
  //     list: Product.getRandomList(id),
  //     product: Product.getById(id),
  //   },
  // });
  /// !!!непонятно на видео 38:10 куда это вставляется
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post("/purchase-submit", function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(reg.query);
  console.log(reg.body);

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("alert", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "alert",

    data: {
      message: "Успішно",
      // info: 'Некоректна кількість товару',
      info: ["Замовлення створено", "Успішно"],
      link: `/purchase-list`,
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// // router.get Створює нам один ентпоїнт

// // ↙️ тут вводимо шлях (PATH) до сторінки
// router.post("/purchase-create", function (req, res) {
//   // res.render генерує нам HTML сторінку

//   console.log(reg.body);

//   const productPrice = product.price * amount;
//   const totalPrice = productPrice + Purchase.DELIVERY_PRICE;

//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render("purchase-create", {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: "purchase-create",

//     data: {
//       cart: [
//         {
//           text: `${product.title} (${amount} шт.)`,
//           price: productPrice,
//         },
//         {
//           text: `Доставка`,
//           price: Purchase.DELIVERY_PRICE,
//         },
//       ],
//       totalPrice,
//       productPrice,
//       deliveryPrice: Purchase.DELIVERY_PRICE,
//     },
//   });
//   // ↑↑ сюди вводимо JSON дані
// });

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router;
