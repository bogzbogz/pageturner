const { getCardBooks, bookId, createRating, deleteRating, categorySelect } = require('../models/bookModel')


async function getBooks(req, res) {
    try {
        const result = await  getCardBooks()

        return res.status(200).json(result)
    } catch (err) {
       // console.log(err);
        return res.status(500).json({ error: 'Nem sikerült lekérni a könyveket'})
    }
}

async function getBookById(req, res) {
    try {
        const result = await bookId()

        return res.status(200).json(result)
    } catch (err) {
       // console.log(err);
        return res.status(500).json({ error: 'Nem sikerült lekérni a könyvet'})
    }
}

async function rating(req, res) {
    try {
        const { user_id } = req.user
        const  book_id  = req.params.id
        const { rate } = req.body
       // console.log(user_id, book_id, rate);

       await createRating(user_id, book_id, rate)

        return res.status(201).json({ message: 'Értékelés leadva' })
    } catch (err) {
      // console.log(err);
       if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Ezt a könyvet már értékelted' })
    }
    return res.status(500).json({ error: 'Hiba az értékelésnél'})
    }
}

async function delRating(req, res) {
    try {
        const { user_id } = req.user
        const  book_id  = req.params.id
       // console.log(user_id, book_id);

    const result = await deleteRating(user_id, book_id)
   // console.log(result);

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Nincs ilyen értékelés'})
        }
    
            return res.status(204).json()
    } catch (err) {
        //console.log(err);
        return res.status(500).json({ error: 'Hiba a törlésnél'}) 
    }
}

async function getCategory(req, res) {
    try {
        const result = await categorySelect()

        return res.status(200).json(result)
    } catch (err) {
       // console.log(err);
        return res.status(500).json({ error: 'Nem sikerült lekérni a kategóriát'})
    }
}

module.exports = { getBooks, getBookById, rating, delRating, getCategory }