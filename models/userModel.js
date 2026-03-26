const db = require('../db/db')

async function findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?'
    const [result] = await db.query(sql, [email])

    return result[0] || null
}

async function createUser(username, email, hash) {
    const sql = 'INSERT INTO users (user_id, username, email, password, role) VALUES (NULL, ?, ?, ?, "user")'
    const [result] = await db.query(sql, [username, email, hash])

    return { insertId: result.insertId}
}

async function getAllUser() {
    const sql = 'SELECT * FROM users'
    const [result] = await db.query(sql)

    return result
}

module.exports = { findByEmail, createUser, getAllUser }