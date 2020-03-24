const express = require("express");
const { MongoClient } = require("mongodb");
const adminRouter = express.Router();
const debug = require("debug")("app:adminRoutes");

const books = [
  {
    id: 1,
    title: "War and Peace",
    genre: "Historical Fiction",
    author: "Lev Nikolayevich Tolstoy",
    read: false,
    bookId: 656,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1413215930l/656._SX98_.jpg"
  },
  {
    id: 2,
    title: "Les Misérables",
    genre: "Historical Fiction",
    author: "Victor Hugo",
    read: false,
    bookId: 24280,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1411852091l/24280._SY160_.jpg"
  },
  {
    id: 3,
    title: "The Time Machine",
    genre: "Science Fiction",
    author: "H. G. Wells",
    read: false,
    bookId: 2493,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327942880l/2493._SX98_.jpg"
  },
  {
    id: 4,
    title: "A Journey into the Center of the Earth",
    genre: "Science Fiction",
    author: "Jules Verne",
    read: false,
    bookId: 46158888,
    imageUrl:
      "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"
  },
  {
    id: 5,
    title: "The Dark World",
    genre: "Fantasy",
    author: "Henry Kuttner",
    read: false,
    bookId: 1881716,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1322680910l/1881716._SX98_.jpg"
  },
  {
    id: 6,
    title: "The Wind in the Willows",
    genre: "Fantasy",
    author: "Kenneth Grahame",
    read: false,
    bookId: 3165100,
    imageUrl:
      "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"
  },
  {
    id: 7,
    title: "Life On The Mississippi",
    genre: "History",
    author: "Mark Twain",
    read: false,
    bookId: 49934097,
    imageUrl:
      "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"
  },
  {
    id: 8,
    title: "Childhood",
    genre: "Biography",
    author: "Lev Nikolayevich Tolstoy",
    read: false,
    bookId: 2359878,
    imageUrl:
      "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"
  }
];

function router(nav) {
  adminRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });
        debug("Connected to the server!!");

        const db = client.db(dbName);
        await db.collection("books").deleteMany({})
        const response = await db.collection("books").insertMany(books);

        res.json(response);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();
  });

  return adminRouter;
}

module.exports = router;
