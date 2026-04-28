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

async function findById(user_id) {
    const sql = 'SELECT * FROM users WHERE user_id = ?'
    const [rows] = await db.query(sql, [user_id])
    return rows.length ? rows[0] : null
}

async function updateUsername(user_id, username) {
    const sql = 'UPDATE users SET username = ? WHERE user_id = ?'
    const [result] = await db.query(sql, [username, user_id])
    return result
}

async function updateEmail(user_id, email) {
    const sql = 'UPDATE users SET email = ? WHERE user_id = ?'
    const [result] = await db.query(sql, [email, user_id])
    return result
}

async function updatePassword(user_id, password) {
    const sql = 'UPDATE users SET password = ? WHERE user_id = ?'
    const [result] = await db.query(sql, [password, user_id])
    return result
}

async function checkUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?'
    const [rows] = await db.query(sql, [username])
    return rows.length ? rows[0] : null
}

async function checkEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?'
    const [rows] = await db.query(sql, [email])
    return rows.length ? rows[0] : null
}

async function getAllUser() {
    const sql = 'SELECT * FROM users'
    const [result] = await db.query(sql)
    return result
}


module.exports = { findByEmail, createUser, findById, updateUsername, updateEmail, updatePassword, checkUsername, checkEmail, getAllUser }