const db = require('../db/db')

async function getAllUser() {
    const sql = 'SELECT * FROM users'
    const [result] = await db.query(sql)

    return result
}

async function getAllBook() {
    const sql = 'SELECT books.title, authors.author, categories.categoryName, ROUND(AVG(ratings.rate),1) AS rating FROM `books` JOIN authors ON books.author_id=authors.author_id JOIN categories ON books.categories_id=categories.categories_id LEFT JOIN ratings ON books.book_id=ratings.book_id GROUP BY books.book_id, books.title, authors.author, categories.categoryName'

    const [result] = await db.query(sql)

    return result
}

module.exports = { getAllBook, getAllUser }