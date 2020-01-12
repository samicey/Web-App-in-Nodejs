const express = require('express')
const bookRouter = express.Router();

const books = [
{
title: 'War and Peace',
genre: 'Historical Fiction',
author: 'Lev Nikolayevich Tolstoy',
read: false,
bookId: 656,
imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1413215930l/656._SX98_.jpg'
},
{
title: 'Les Misérables',
genre: 'Historical Fiction',
author: 'Victor Hugo',
read: false,
bookId: 24280,
imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1411852091l/24280._SY160_.jpg'
},
{
title: 'The Time Machine',
genre: 'Science Fiction',
author: 'H. G. Wells',
read: false,
bookId: 2493,
imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327942880l/2493._SX98_.jpg'
},
{
title: 'A Journey into the Center of the Earth',
genre: 'Science Fiction',
author: 'Jules Verne',
read: false,
bookId: 46158888,
imageUrl: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
},
{
title: 'The Dark World',
genre: 'Fantasy',
author: 'Henry Kuttner',
read: false,
bookId: 1881716,
imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1322680910l/1881716._SX98_.jpg'
},
{
title: 'The Wind in the Willows',
genre: 'Fantasy',
author: 'Kenneth Grahame',
read: false,
bookId: 3165100,
imageUrl: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
},
{
title: 'Life On The Mississippi',
genre: 'History',
author: 'Mark Twain',
read: false,
bookId: 49934097,
imageUrl: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
},
{
title: 'Childhood',
genre: 'Biography',
author: 'Lev Nikolayevich Tolstoy',
read: false,
bookId: 2359878,
imageUrl: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
}
];


bookRouter.route('/')
.get((req,res)=>{
   res.render('books', 
             {
      nav:[
          {links:'/books',title:'Books'},
          {links:'/authors',title:'Authors'}
      ],
      title:'Library',
       books
  }
            );
});

bookRouter.route('/:id')
.get((req,res)=>{
    const id = req.params.id
    res.render('books', 
             {
      nav:[
          {links:'/books',title:'Books'},
          {links:'/authors',title:'Authors'}
      ],
      title:'Library',
       book:books[id]
  }
            );
});

module.exports = bookRouter;