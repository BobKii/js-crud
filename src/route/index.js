// Підключаємо технологію express для back-end сервера
const express = require("express");
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router();

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/", function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("spotify-choose", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "spotify-choose",

    data: {},
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/spotify-choose", function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("spotify-choose", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "spotify-choose",

    data: {},
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/spotify-create", function (req, res) {
  // res.render генерує нам HTML сторінку

  const isMix = !!req.query.isMix;

  console.log(isMix);

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render("spotify-create", {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: "spotify-create",

    data: {
      isMix,
    },
  });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post("/spotify-create", function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(req.body, req.query);

  const isMix = !!req.query.isMix;

  const name = req.body.name;

  if (!name) {
    return res.render("alert", {
      style: "alert",
      data: {
        title: "Помилка",
        info: ["Введіть назву плейлиста", "Помилка"],
        link: isMix ? "/spotify-create?isMix=true" : "/spotify-create",
      },
    });
  }

  const playlist = Playlist.create(name);

  if (isMix) {
    Playlist.makeMix(playlist);
  }

  console.log(playlist);

  res.render("alert", {
    style: "alert",
    data: {
      title: "Успішно",
      info: ["Плейлист створений", "Успішно"],
      link: `/spotify-playlist?id=${playlist.id}`,
    },
  });

  // // ↙️ cюди вводимо назву файлу з сontainer
  // res.render("spotify-create", {
  //   // вказуємо назву папки контейнера, в якій знаходяться наші стилі
  //   style: "spotify-create",

  //   data: {},
  // });
  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router;

// ================================================================

class Track {
  //Статичне приватне поле для зберігання списку об"єктів Track
  static #list = [];

  constructor(name, author, image) {
    // Генерує випадкове id
    this.id = Math.floor(1000 + Math.random() * 9000);
    this.name = name;
    this.author = author;
    this.image = image;
  }

  //Статичний метод для створення об"єкту Track і додавання його до списку #list
  static create(name, author, image) {
    const newTrack = new Track(name, author, image);
    this.#list.push(newTrack);
    return newTrack;
  }

  //Статичний метод для отримання всього списку треків #list
  static getList() {
    return this.#list.reverse();
  }
}

Track.create("Інь Янь", "MOXNATIK i ROXOLANA", "https://picsum.photos.100/100");

Track.create(
  "Літаки з паперу слів...",
  'Непам"ятаю',
  "https://picsum.photos.100/100"
);

Track.create(
  "Ой летіли дикі гуси...",
  "Матвієнко",
  "https://picsum.photos.100/100"
);

Track.create("444444444", "44444444444444", "https://picsum.photos.100/100");

Track.create("555555555", "55555555555555", "https://picsum.photos.100/100");

console.log(Track.getList());

class Playlist {
  //Статичне приватне поле для зберігання списку об"єктів Playlist
  static #list = [];

  constructor(name) {
    // Генерує випадкове id
    this.id = Math.floor(1000 + Math.random() * 9000);
    this.name = name;
    this.tracks = [];
  }

  //Статичний метод для створення об"єкту Playlist і додавання його до списку #list
  static create(name) {
    const newPlaylist = new Playlist(name);
    this.#list.push(newPlaylist);
    return newPlaylist;
  }

  //Статичний метод для отримання всього списку плейлистів #list
  static getList() {
    return this.#list.reverse();
  }

  static makeMix(playlist) {
    const allTrack = Track.getList();

    let randomTracks = allTrack.sort(() => 0.5 - Math.random()).slice(0, 3);

    playlist.tracks.push(...randomTracks);
  }
}
