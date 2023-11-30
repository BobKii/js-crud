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
        message: "Помилка",
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

  res.render("spotify-playlist", {
    style: "spotify-playlist",
    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  });

  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/spotify-playlist", function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(req.body, req.query);

  const id = Number(req.query.id);

  const playlist = Playlist.getById(id);

  if (!playlist) {
    return res.render("alert", {
      style: "alert",
      data: {
        message: "Помилка",
        info: ["Такого плейлиста не знайдено", message],
        link: "/",
      },
    });
  }

  res.render("spotify-playlist", {
    style: "spotify-playlist",

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  });

  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/spotify-track-delete", function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(req.body, req.query);

  const playlistId = Number(req.query.playlistId);
  const trackId = Number(req.query.trackId);

  const playlist = Playlist.getById(playlistId);

  if (!playlist) {
    return res.render("alert", {
      style: "alert",
      data: {
        message: "Помилка",
        info: ["Такого плейлиста не знайдено", message],
        link: `/spotify-playlist?id=${playlistId}`,
      },
    });
  }

  playlist.deleteTrackById(trackId);

  res.render("spotify-playlist", {
    style: "spotify-playlist",

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  });

  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/spotify-search", function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(req.body, req.query);

  const value = "";

  const list = Playlist.findListByValue(value);

  res.render("spotify-search", {
    style: "spotify-search",
    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        amount: tracks.lenght,
      })),
      value,
    },
  });

  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post("/spotify-search", function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(req.body, req.query);

  const value = req.body.value || "";

  const list = Playlist.findListByValue(value);

  res.render("spotify-search", {
    style: "spotify-search",
    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        amount: tracks.lenght,
      })),
      value,
    },
  });

  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/spotify-playlist-add", function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(`== start =====  router.get("/spotify-playlist-add" =====`);
  console.log(req.body, req.query);
  console.log(`== start =====  router.get("/spotify-playlist-add" =====`);

  const id = Number(req.query.playlistId);

  const playlist = Playlist.getById(id);

  const allSongs = Track.getList();

  console.log(allSongs);

  if (!playlist) {
    return res.render("alert", {
      style: "alert",
      data: {
        message: "Помилка",
        info: ["Такого плейлиста не знайдено", "Помилка"],
        link: "/",
      },
    });
  }

  res.render("spotify-playlist-add", {
    style: "spotify-playlist-add",

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
      allsongs: allSongs,
    },
  });

  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get("/spotify-playlist-add-choice", function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(`== start =====  router.get("spotify-playlist-add-choice" =====`);
  console.log(req.body, req.query);
  console.log(
    `== start =====  router.get("/spotify-playlist-add-choice" =====`
  );

  // const id = Number(req.query.playlistId);

  // const playlist = Playlist.getById(id);

  // const allSongs = Track.getList();

  // console.log(allSongs);

  // if (!playlist) {
  //   return res.render("alert", {
  //     style: "alert",
  //     data: {
  //       message: "Помилка",
  //       info: ["Такого плейлиста не знайдено", "Помилка"],
  //       link: "/",
  //     },
  //   });
  // }

  res.render("spotify-playlist", {
    style: "spotify-playlist",

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
      allsongs: allSongs,
    },
  });

  // ↑↑ сюди вводимо JSON дані
});

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post("/spotify-playlist-add", function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(
    `== start =====  router.post("spotify-playlist-add-choice" =====`
  );
  console.log(req.body, req.query);
  console.log(
    `== start =====  router.post("/spotify-playlist-add-choice" =====`
  );

  // const id = Number(req.query.playlistId);

  // const playlist = Playlist.getById(id);

  // const allSongs = Track.getList();

  // console.log(allSongs);

  // if (!playlist) {
  //   return res.render("alert", {
  //     style: "alert",
  //     data: {
  //       message: "Помилка",
  //       info: ["Такого плейлиста не знайдено", "Помилка"],
  //       link: "/",
  //     },
  //   });
  // }

  res.render("spotify-playlist", {
    style: "spotify-playlist",

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
      allsongs: allSongs,
    },
  });

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
    this.image = "https://picsum.photos.100/100";
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

  static getById(id) {
    return Playlist.#list.find((playlist) => playlist.id === id) || null;
  }

  deleteTrackById(trackId) {
    this.tracks = this.tracks.filter((track) => track.id !== trackId);
  }

  static findListByValue(name) {
    return this.#list.filter((playlist) =>
      playlist.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}

Playlist.makeMix(Playlist.create("Test1"));
Playlist.makeMix(Playlist.create("Test2"));
Playlist.makeMix(Playlist.create("Test3"));
