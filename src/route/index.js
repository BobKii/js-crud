// Підключаємо технологію express для back-end сервера
const express = require("express");
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router();

// ================================================================

class User {
  static #list = [];

  constructor(email, login, password) {
    this.email = email;
    this.login = login;
    this.password = password;
    this.id = new Date().getTime();
  }

  verifyPassword = (password) => this.password === password;

  static add = (user) => {
    this.#list.push(user);
  };

  static getList = () => this.#list;

  static getById = (id) => this.#list.find((user) => user.id === id);

  static deleteById = (id) => {
    const index = this.#list.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.#list.splice(index, 1);
      return true;
    } else {
      return false;
    }
  };

  static updateById = (id, data) => {
    const user = this.getById(id);

    if (user) {
      this.update(user, data);
      // if (email) {
      //   user.email = email;
      // }
      // // Object.assign(user, { email });
      return true;
    } else {
      return false;
    }
  };

  static update = (user, { email }) => {
    if (email) {
      user.email = email;
    }
  };
}

// ======================  2 - product  ==========================================

class Product {
  constructor(name, price, description) {
    this.id = Math.round(Math.random() * 1000000);
    this.createDate = new Date();
    this.name = name;
    this.price = price;
    this.description = description;
    return this;
  }

  static #list = [];

  static getList = () => this.#list;

  static add = (product) => {
    this.#list.push(product);
  };

  static getById = (id) => {
    this.#list.find((product) => product.id === id);
    console.log(product.id);
  };

  static updateById = (id, data) => {
    const product = this.getById(id);
    if (product) {
      this.update(product, data);
      return true;
    } else {
      return false;
    }
  };

  static update = (product, data) => {
    if (data) {
      // const index = this.#list.findIndex((id) => user.id === id);
      product.price = data.price;
      product.name = data.name;
      product.description = data.description;
    }
  };

  static deleteById = (id) => {
    const index = this.#list.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.#list.splice(index, 1);
      return true;
    } else {
      return false;
    }
  };
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/", function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = User.getList();

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("index", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "index",

    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

router.post("/user-create", function (req, res) {
  // res.render генерує нам HTML сторінку
  const { email, login, password } = req.body;
  console.log(req.body);

  const user = new User(email, login, password);
  User.add(user);
  console.log(User.getList());

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("success-info", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "success-info",
    info: "користувач створений",
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

router.get("/user-delete", function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id } = req.query;

  const user = User.deleteById(Number(id));
  if (user) {
    console.log("==                                   ==");
    console.log(" !!!!!!!!!!!!!!  DELETE  !!!!!!!!!!!!!!");
    console.log("==                                   ==");
  }

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("success-info", {
    style: "success-info",
    info: "користувач видалений",
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

router.post("/user-update", function (req, res) {
  // res.render генерує нам HTML сторінку
  const { email, password, id } = req.body;

  let result = false;

  const user = User.getById(Number(id));

  if (user.verifyPassword(password)) {
    User.update(user, { email });
    result = true;
  }

  console.log(email, password, id);

  result = User.updateById(Number(id), { email });

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("success-info", {
    style: "success-info",
    info: result ? "пошта email оновлена" : "Сталася поМилКа !!!",
  });
  // ↑↑ сюди вводимо JSON дані
});

// ======================  2 - product  ==========================================

router.get("/product-create", function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = Product.getList();

  const { id, createDate, name, price, description } = req.body;

  // const product = Product.getById(Number(id));

  // if (user.verifyPassword(password)) {
  //   User.update(user, { email });
  //   result = true;
  // }

  // console.log(email, password, id);

  // result = User.updateById(Number(id), { email });

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("product-create", {
    style: "product-create",

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
    // info: "Товар створений",
  });
  // ↑↑ сюди вводимо JSON дані
  console.log(data);
});

router.post("/product-create", function (req, res) {
  // res.render генерує нам HTML сторінку

  const { id, createDate, name, price, description } = req.body;
  console.log(req.body);

  const product = new Product(name, price, description);
  Product.add(product);
  console.log(User.getList());

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("alert", {
    style: "alert",
    info: ["Товар створений", true],
  });
  // ↑↑ сюди вводимо JSON дані
});

router.get("/product-list", function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = Product.getList();

  const { id, createDate, name, price, description } = req.body;

  // const product = Product.getById(Number(id));

  // if (user.verifyPassword(password)) {
  //   User.update(user, { email });
  //   result = true;
  // }

  console.log(`Це list ---> ${{ list }}`);

  // result = User.updateById(Number(id), { email });

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("product-list", {
    style: "product-list",

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
    // info: "Товар створений",
  });
  // ↑↑ сюди вводимо JSON дані
  // console.log("====== Це data =======");
  // console.log(data);
  // console.log("====== Це data =======");
});

// Підключаємо роутер до бек-енду
module.exports = router;
