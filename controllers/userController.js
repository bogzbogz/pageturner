const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { config } = require('../config/dotenvConfig')
const { findByEmail, createUser, getAllUser, findById, checkUsername, checkEmail, updateUsername, updateEmail, updatePassword } = require('../models/userModel')



const cookieOpts = {
    httpOnly: true,
    secure: true, // https-nél true
    sameSite: 'none',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

// register
async function register(req, res) {
    try {
        const { username, password, email} = req.body
      
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Minden mezőt tölts ki!'})
        }

        const exist = await findByEmail(email)
        if (exist) {
            return res.status(409).json({ error: 'Ez az email már létezik!'})
        }

        const hash = await bcrypt.hash(password, 10)
        const { insertId } = await createUser(username, email, hash)

        return res.status(201).json({ message: 'Sikeres regisztráció!', insertId })




    } catch (err) {
        return res.status(500).json({ error: 'Szerver oldali hiba', err})
    }
}

// login
async function login(req, res) {
    try {
        const { email, password } = req.body
       // console.log(email, psw);

    if (!email || !password) {
        return res.status(400).json({ error: 'Email és jelszó kötelező'})
    } 

        const userSQL = await findByEmail(email)
        //console.log(userSQL);
        if (!userSQL) {
            return res.status(401).json({ error: 'Hibás email' })
        }


        const ok = await bcrypt.compare(password, userSQL.password)
       // console.log(ok);
       if (!ok) {
            return res.status(401).json({ error: 'Hibás jelszó'})
       }

       const token = jwt.sign(
            { user_id: userSQL.user_id, email: userSQL.email, username: userSQL.username, role: userSQL.role },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
       )
      // console.log(token);
      res.cookie(config.COOKIE_NAME, token, cookieOpts)
       return res.status(200).json({ message: 'Sikeres bejelentkezés' })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Bejelentkezési hiba', err})
    }
   
}

async function whoAmI(req, res) {
    const { user_id, username, email, role} = req.user
    try {
        return res.status(200).json({user_id: user_id, username: username, email: email, role: role})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'whoAmI server oldali hiba'})
        
    }
}

// logout
async function logout(req, res) {
    return res.clearCookie(config.COOKIE_NAME, { httpOnly: true,
        secure: true, // https-nél true
        sameSite: 'none',
        path: '/', }).status(200).json({ message: 'Sikeres kilépés' })
}

// username módosítás
async function editUsername(req, res) {
    try {
        const { user_id } = req.user
        const { username } = req.body
        if (!username) return res.status(400).json({ error: 'Felhasználónév kötelező' })
        const exists = await checkUsername(username)
        if (exists && exists.user_id !== parseInt(user_id)) {
            return res.status(409).json({ error: 'Ez a felhasználónév már foglalt' })
        }
        await updateUsername(user_id, username)
        return res.status(200).json({ message: 'Sikeres módosítás' })
    } catch (err) {
        return res.status(500).json({ error: 'Szerver hiba' })
    }
}

// email módosítás
async function editEmail(req, res) {
    try {
        const { user_id } = req.user
        const { email } = req.body
        if (!email) return res.status(400).json({ error: 'Email kötelező' })
        const exists = await checkEmail(email)
        if (exists && exists.user_id !== parseInt(user_id)) {
            return res.status(409).json({ error: 'Ez az email már foglalt' })
        }
        await updateEmail(user_id, email)
        return res.status(200).json({ message: 'Sikeres módosítás' })
    } catch (err) {
        return res.status(500).json({ error: 'Szerver hiba' })
    }
}

// jelszó módosítás
async function editPassword(req, res) {
    try {
        const { user_id } = req.user
        const { currentPassword, newPassword } = req.body
        if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Minden mező kötelező' })
        const user = await findById(user_id)
        const ok = await bcrypt.compare(currentPassword, user.password)
        if (!ok) return res.status(401).json({ error: 'Hibás jelenlegi jelszó' })
        const hash = await bcrypt.hash(newPassword, 10)
        await updatePassword(user_id, hash)
        return res.status(200).json({ message: 'Sikeres jelszó módosítás' })
    } catch (err) {
        return res.status(500).json({ error: 'Szerver hiba' })
    }
}

module.exports = { register, login, whoAmI, logout, editUsername, editEmail, editPassword }