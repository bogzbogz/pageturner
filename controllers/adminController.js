const { userEdit, userDelete, getAllBook, getAllUser} = require('../models/adminModel')



async function editUser(req, res) {
    try {
        const { user_id } = req.params
        const { username, email, role } = req.body

        const result = await userEdit(user_id, username, email, role)

        if (result.length === 0) {
            return res.status(404).json({ error: 'A felhasználó nem található' })
        }

        return res.status(201).json({ message: 'Sikeres módosítás' })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'felhasználó módosítása server oldali hiba' })
    }
}


async function deleteUser(req, res) {
    try {
        const { user_id } = req.params

        const result = await userDelete(user_id)

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'A felhasználó nem található' })
        }

        return res.status(200).json({ message: 'Sikeres törlés' })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'felhasználó törlése server oldali hiba' })
    }
}

async function AllBook(req, res) {
    try {
        const result = await getAllBook()

        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({ error: 'összes könyv lekérése server oldali hiba'})
    }
}

async function allUser(req, res) {
    try {
        const result = await getAllUser()

        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({ error: 'összes user lekérése server oldali hiba'})
    }
}

module.exports = { editUser, deleteUser, AllBook, allUser }