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

// Підключаємо роутер до бек-енду
module.exports = router;
