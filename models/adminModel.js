const db = require('../db/db')

// egy felhasználó módosítása id alapján
async function userEdit(user_id, username, email, role) {
    const sql = 'UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?'
    const [result] = await db.query(sql, [username, email, role, user_id])
    
    return result
}

// egy felhasználó törlése id alapján
async function userDelete(user_id) {
    const sql = 'DELETE FROM users WHERE user_id = ?'
    const [result] = await db.query(sql, [user_id])

    return result
}

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

module.exports = { userEdit, userDelete, getAllBook, getAllUser }