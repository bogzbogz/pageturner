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

// egy könyv módosítása id alapján
async function bookEdit(book_id, categories_id, author_id, title, description, cover) {
    const sql = 'UPDATE books SET categories_id = ?, author_id = ?, title = ?, description = ?, cover = ? WHERE book_id = ?'
    const [result] = await db.query(sql, [categories_id, author_id, title, description, cover, book_id])
    return result
}
 
// egy könyv törlése id alapján
async function bookDelete(book_id) {
    const sql = 'DELETE FROM books WHERE book_id = ?'
    const [result] = await db.query(sql, [book_id])
    return result
}

module.exports = { userEdit, userDelete, getAllBook, getAllUser, bookEdit, bookDelete }