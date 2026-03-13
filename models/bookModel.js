const db = require('../db/db')

async function getCardBooks() {
    const sql = 'SELECT books.book_id, books.title, authors.author, books.cover, ROUND(AVG(ratings.rate), 1) AS ratings FROM books LEFT JOIN authors ON books.author_id = authors.author_id LEFT JOIN ratings ON books.book_id = ratings.book_id GROUP BY books.book_id, books.title, authors.author, books.cover ORDER BY books.book_id ASC'
    const [result] = await db.query(sql)
    return result
}

async function bookId() {
   const sql = 'SELECT books.book_id, title, authors.author, cover, description, ratings.rate FROM books LEFT JOIN authors ON books.author_id = authors.author_id LEFT JOIN ratings ON books.book_id = ratings.book_id'
    const [result] = await db.query(sql)
    return result
}

async function createAuthor(author) {
    const sql = 'INSERT INTO authors (author) VALUES (?)';
    const [result] = await db.query(sql, [author]);
  
    return result.insertId;
}

async function createBook(categories_id, author_id, title, description, cover) {
    const sql = 'INSERT INTO books (categories_id, author_id, title, description, cover) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [categories_id, author_id, title, description, cover]);

    return result.insertId;
}

async function getAuthorIdByName(author) {
    const sql = 'SELECT author_id FROM authors WHERE author = ?';
    const [rows] = await db.query(sql, [author]);
    return rows.length ? rows[0].author_id : null;
}

async function createRating(user_id, book_id, rate) {
   const sql = 'INSERT INTO ratings(user_id, book_id, rate) VALUES (?, ?, ?)'
    const [result] = await db.query(sql, [user_id, book_id, rate])
}

async function deleteRating(user_id, book_id) {
    const sql = 'DELETE FROM ratings WHERE user_id = ? AND book_id = ?'
     const [result] = await db.query(sql, [user_id, book_id])
     return result
 }

 async function categorySelect(categories_id) {
    console.log(categories_id);
    const sql = 'SELECT * FROM books WHERE categories_id = ?'
    const [result] = await db.query(sql, [categories_id])
    console.log(result);
    return result
}


module.exports = { getCardBooks, bookId, createAuthor, createBook, getAuthorIdByName, createRating, deleteRating, categorySelect }