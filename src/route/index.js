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

// ================================================================

class Promocode {
  static #list = [];

  constructor(name, factor) {
    this.name = name;
    this.factor = factor;
  }

  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor);
    Promocode.#list.push(newPromoCode);
    return newPromoCode;
  };

  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name);
  };

  static calc = (promo, price) => {
    return price * promo.factor;
  };
}

Promocode.add("NOVEMBER2023", 0.9);
Promocode.add("BLACKFRYDAY2023", 0.7);
Promocode.add("SALES25", 0.75);

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
  static #BONUS_FACTOR = 0.1;

  static #count = 0;
  static #list = [];

  static #bonusAccount = new Map();

  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0;
  };

  static calcBonusAmount = (value) => {
    return value * Purchase.#BONUS_FACTOR;
  };

  static updateBonusBalance = (email, price, bonusUse = 0) => {
    // const amountBonus = price * Purchase.#BONUS_FACTOR;

    const amountBonus = this.calcBonusAmount(price);

    const currentBalance = Purchase.getBonusBalance(email);

    const updateBalance = currentBalance + amountBonus - bonusUse;

    Purchase.#bonusAccount.set(email, updateBalance);

    console.log(email, updateBalance);

    return amountBonus;
  };

  constructor(data, product) {
    this.id = ++Purchase.#count;

    this.firstname = data.firstname;
    this.lastname = data.lastname;

    this.phone = data.phone;
    this.email = data.email;

    this.comment = data.comment || null;

    this.bonus = data.bonus || 0;

    this.promocode = data.promocode || null;

    this.totalPrice = data.totalPrice;
    this.productPrice = data.productPrice;
    this.deliveryPrice = data.deliveryPrice;
    this.amount = data.amount;

    this.product = product;
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg);

    this.#list.push(newPurchase);

    return newPurchase;
  };

  static getList = () => {
    // return Purchase.#list.reverse().map({...} => {...});
    return Purchase.#list.reverse();
  };

  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id);
  };

  static updateById = (id, data) => {
    // const purchase = Purchase.#list.find(
    //   (item) => item.id === id,
    // )
    const purchase = Purchase.getById(id);

    if (purchase) {
      if (data.firstname) purchase.firstname = data.firstname;
      if (data.lastname) purchase.lastname = data.lastname;
      if (data.phone) purchase.phone = data.phone;
      if (data.email) purchase.email = data.email;

      return true;
    } else {
      return false;
    }
  };
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
    component: ["divider", "field", "button", "heading"],
    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

//Анна | IT-BRAINS, [27.11.2023 16:16]

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post("/purchase-create", function (req, res) {
  // res.render генерує нам HTML сторінку
  const id = Number(req.query.id);
  const amount = Number(req.body.amount);

  if (amount < 1) {
    return res.render("alert", {
      style: "alert",
      component: ["button", "heading"],

      data: {
        link: `/purchase-product?id=${id}`,
        title: "Помилка",
        info: ["Некоректна кількість товару", "Помилка"],
      },
    });
  }

  const product = Product.getById(id);

  if (product.amount < 1) {
    return res.render("alert", {
      style: "alert",
      component: ["button", "heading"],

      data: {
        link: `/purchase-product?id=${id}`,
        title: "Помилка",
        info: ["Такої кількості товару немає в намявнсисті", "Помилка"],
      },
    });
  }

  console.log(product, amount);

  const productPrice = product.price * amount;
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE;
  const bonus = Purchase.calcBonusAmount(totalPrice);
  // const bonus = 1;
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("purchase-create", {
    style: "purchase-create",
    component: ["divider", "field", "button", "heading"],

    data: {
      title: "Ваше замовлення",
      subtitle: "Оформлення замовлення",

      id: product.id,

      cart: [
        {
          text: `${product.title} (${amount} шт)`,
          price: product.price,
        },
        {
          text: "Вартість доставки",
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      amount,
      bonus,
      deliveryPrice: Purchase.DELIVERY_PRICE,
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post("/purchase-submit", function (req, res) {
  // res.render генерує нам HTML сторінку
  // console.log(req.query)
  // console.log(req.body)
  const id = Number(req.query.id);

  console.log("== 1 ==== router.post(/purchase-submit, =====");
  console.log(req.body);
  console.log(req.query);
  // console.log(amount);

  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,
    comment,
    delivery,

    promocode,
    bonus,
  } = req.body;

  console.log("== 2 ==== router.post(/purchase-submit, =====");
  console.log(req.body);

  const product = Product.getById(id);

  if (!product) {
    return res.render("alert", {
      style: "alert",
      component: ["button", "heading"],

      data: {
        link: "/purchase-list",
        title: "Помилка",
        info: "Товар не знайдено",
      },
    });
  }

  if (product.amount < amount) {
    return res.render("alert", {
      style: "alert",
      component: ["button", "heading"],

      data: {
        link: "/purchase-list",
        title: "Помилка",
        info: ["Товару немає в потрібній кількості", "Помилка"],
      },
    });
  }

  totalPrice = Number(totalPrice);
  productPrice = Number(productPrice);
  deliveryPrice = Number(deliveryPrice);
  amount = Number(amount);
  bonus = Number(bonus);
  console.log("====== router.post(/purchase-submit, =====");
  console.log("====== СЛУЖБОВІ  ПЕРЕД ПЕРЕВІРКОЮ =====");
  console.log(totalPrice, productPrice, deliveryPrice, amount);
  console.log("====== =========================== =====");
  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount) ||
    isNaN(bonus)
  ) {
    return res.render("alert", {
      style: "alert",
      component: ["button", "heading"],

      data: {
        link: "/purchase-list",
        title: "Помилка",
        info: ["Некорректні данні", "Помилка"],
      },
    });
  }

  if ((!firstname, !lastname, !email, !phone)) {
    return res.render("alert", {
      style: "alert",
      component: ["button", "heading"],

      data: {
        link: "/purchase-list",
        title: "Заповніть обов'язкові поля",
        info: ["Некорректні данні", "Заповніть обов'язкові поля"],
      },
    });
  }

  if (bonus || bonus > 0) {
    const bonusAmount = Purchase.getBonusBalance(email);

    console.log(bonusAmount);

    if (bonus > bonusAmount) {
      bonus = bonusAmount;
    }

    Purchase.updateBonusBalance(email, totalPrice, bonus);

    totalPrice -= bonus;
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0);
  }

  if (promocode) {
    promocode = Promocode.getByName(promocode);

    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice);
    }
  }

  if (totalPrice < 0) totalPrice = 0;

  const purchase = Purchase.add(
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,
      bonus,

      firstname,
      lastname,
      email,
      phone,

      promocode,
      comment,
      delivery,
    },
    product
  );

  console.log(purchase);

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("alert", {
    style: "alert",
    component: ["button", "heading"],

    data: {
      link: "/purchase-list",
      title: "Успішне виконання дії",
      info: ["Замовлення створене", "Успішне виконання дії"],
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/purchase-my", function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("purchase-my", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "purchase-my",
    component: ["divider", "field", "button", "heading"],
    data: {
      list: Purchase.getList(),
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/purchase-view", function (req, res) {
  // res.render генерує нам HTML сторінку

  console.log('=========  router.get("/purchase-view"  ==== ');
  console.log("=========  reg.query   ================  ==== ");
  console.log(req.query);
  console.log("=========  reg.body    ================  ==== ");
  console.log(req.body);

  const id = Number(req.query.id);

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("purchase-view", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "purchase-view",
    component: ["divider", "field", "button", "heading"],
    data: {
      list: Purchase.getById(id),
      // list: Product.getRandomList(id),
      // product: Product.getById(id),
    },
  });

  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/purchase-edit", function (req, res) {
  // res.render генерує нам HTML сторінку

  console.log('=========  router.get("/purchase-edit",  ==== ');
  console.log("=========  reg.query   ================  ==== ");
  console.log(req.query);
  console.log("=========  reg.body    ================  ==== ");
  console.log(req.body);

  const id = Number(req.query.id);

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("purchase-edit", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "purchase-edit",
    component: ["divider", "field", "button", "heading"],
    data: {
      list: Purchase.getById(id),
      // list: Product.getRandomList(id),
      // product: Product.getById(id),
    },
  });

  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post("/purchase-edit", function (req, res) {
  // res.render генерує нам HTML сторінку

  console.log('=========  router.post("/purchase-edit",  ==== ');
  console.log("=========  reg.query   ================  ==== ");
  console.log(req.query);
  console.log("=========  reg.body    ================  ==== ");
  console.log(req.body);

  const id = Number(req.query.id);

  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,
    comment,
    delivery,

    promocode,
    bonus,
  } = req.body;

  console.log("== 2 ==== router.post(/purchase-edit, =====");
  console.log(req.body);

  if ((!firstname, !lastname, !email, !phone)) {
    return res.render("alert", {
      style: "alert",
      component: ["button", "heading"],

      data: {
        link: "/purchase-list",
        title: "Заповніть обов'язкові поля",
        info: ["Некорректні данні", "Заповніть обов'язкові поля"],
      },
    });
  }

  const purchase = Purchase.updateById(id, {
    firstname,
    lastname,
    email,
    phone,
  });

  console.log(purchase);

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("alert", {
    style: "alert",
    component: ["button", "heading"],

    data: {
      link: "/purchase-list",
      title: "Замовлення Успішно Збережено",
      info: ["Успішно Збережено", "Замовлення Успішно Збережено"],
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router;
