const db = require('../db/db')

async function getCardBooks() {
   const sql = 'SELECT books.book_id, title, authors.author, cover, ratings.rate FROM books LEFT JOIN authors ON books.author_id = authors.author_id LEFT JOIN ratings ON books.book_id = ratings.book_id'
    const [result] = await db.query(sql)
    return result
}

async function bookId() {
   const sql = 'SELECT books.book_id, title, authors.author, cover, description, ratings.rate FROM books LEFT JOIN authors ON books.author_id = authors.author_id LEFT JOIN ratings ON books.book_id = ratings.book_id'
    const [result] = await db.query(sql)
    return result
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
    const sql = 'SELECT * FROM books WHERE categories_id = ?'
    const [result] = await db.query(sql, [categories_id])
    return result
}


module.exports = { getCardBooks, bookId, createRating, deleteRating, categorySelect }