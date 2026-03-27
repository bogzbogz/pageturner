const { getAllBook, getAllUser} = require('../models/adminModel')

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

module.exports = { AllBook, allUser }