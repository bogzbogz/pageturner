const { userEdit, userDelete, getAllBook, getAllUser, bookEdit, bookDelete } = require('../models/adminModel')
const { getAuthorIdByName, createAuthor } = require('../models/bookModel')


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

async function editBook(req, res) {
    try {
        const { book_id } = req.params
        const { title, author, categories_id, description } = req.body

        if (!title || !author || !categories_id || !description || !req.file) {
            return res.status(400).json({ error: 'Minden mezőt tölts ki, és tölts fel egy képet!' })
        }

        const coverPath = `uploads_tmp/${req.user.user_id}/${req.file.filename}`

        let author_id = await getAuthorIdByName(author)
        if (!author_id) {
            author_id = await createAuthor(author)
        }

        const result = await bookEdit(book_id, categories_id, author_id, title, description, coverPath)

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'A könyv nem található' })
        }

        return res.status(200).json({ message: 'Sikeres módosítás!', book_id, author_id, coverPath })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Könyv módosítása server oldali hiba', err })
    }
}
 
async function deleteBook(req, res) {
    try {
        const { book_id } = req.params
 
        const result = await bookDelete(book_id)
 
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'A könyv nem található' })
        }
 
        return res.status(200).json({ message: 'Sikeres törlés' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Könyv törlése server oldali hiba' })
    }
}

module.exports = { editUser, deleteUser, AllBook, allUser, editBook, deleteBook }