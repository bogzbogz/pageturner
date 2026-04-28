const { getCardBooks, bookId, createRating, deleteRating, categorySelect, createAuthor, createBook, getAuthorIdByName, rndBook, userRatedBooks, rndBookAll, searchBooks  } = require('../models/bookModel')


async function getBooks(req, res) {
    try {
        const result = await getCardBooks()

        return res.status(200).json(result)
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ error: 'Nem sikerült lekérni a könyveket' })
    }
}

async function getBookById(req, res) {
    try {
        const { id } = req.params
        const result = await bookId(id)

        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({ error: 'Nem sikerült lekérni a könyvet' })
    }
}

async function bookCreate(req, res) {
    console.log("USER:", req.user)
console.log("FILE:", req.file)
    try {
        const { title, author, categories_id, description } = req.body;

        if (!title || !author || !categories_id || !description || !req.file) {
            return res.status(400).json({ error: 'Minden mezőt tölts ki, és tölts fel egy képet!' });
        }

        // coverPath a user ID-val együtt
        const coverPath = `uploads_tmp/${req.user.user_id}/${req.file.filename}`;

        let author_id = await getAuthorIdByName(author);
        if (!author_id) {
            author_id = await createAuthor(author);
        }

        const book_id = await createBook(categories_id, author_id, title, description, coverPath);

        return res.status(201).json({ message: 'Sikeres felvitel!', book_id, author_id, coverPath });
    } catch (err) {
        return res.status(500).json({ error: 'Szerver oldali hiba', err });
    }
}

async function rating(req, res) {
    try {
        const { user_id } = req.user
        const book_id = req.params.id
        const { rate } = req.body
        // console.log(user_id, book_id, rate);

        await createRating(user_id, book_id, rate)

        return res.status(201).json({ message: 'Értékelés leadva' })
    } catch (err) {
        // console.log(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Ezt a könyvet már értékelted' })
        }
        return res.status(500).json({ error: 'Hiba az értékelésnél' })
    }
}

async function delRating(req, res) {
    try {
        const { user_id } = req.user
        const book_id = req.params.id
        // console.log(user_id, book_id);

        const result = await deleteRating(user_id, book_id)
        // console.log(result);

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Nincs ilyen értékelés' })
        }

        return res.status(204).json()
    } catch (err) {
        //console.log(err);
        return res.status(500).json({ error: 'Hiba a törlésnél' })
    }
}

async function getCategory(req, res) {
    try {
        //console.log(req.params);
        const { categories_id } = req.params
       
        const result = await categorySelect(categories_id)
        //console.log(result);
        return res.status(200).json(result)
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ error: 'Nem sikerült lekérni a kategóriát' })
    }
}

async function randomBook(req, res) {
    try {
       const result = await rndBook()

       return res.status(200).json(result)
    } catch (err) {
       // console.log(err)
        return res.status(500).json({ error: 'Adatbázis hiba a könyvek megjelenítésekor' })
    }
   
}

async function userRatedBook(req, res) {
    try {
        const result = await userRatedBooks(req.user.user_id)
        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Adatbázis hiba a felhasználó értékelt könyveinél' });
    }
}

async function randomBookAll(req, res) {
    try {
        const result = await rndBookAll()
 
        return res.status(200).json(result)
     } catch (err) {
        // console.log(err)
         return res.status(500).json({ error: 'Adatbázis hiba a könyvek megjelenítésekor' })
     }
}

async function search(req, res) {
    try {
        const { query } = req.params
        const result = await searchBooks(query)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({ error: 'Keresés sikertelen' })
    }
}

module.exports = { getBooks, getBookById, bookCreate, rating, delRating, getCategory, randomBook, userRatedBook, randomBookAll, search }