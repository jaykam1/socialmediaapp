const db = require('../../lib/db');
const bcrypt = require('bcrypt');

export default async (req, res) => {
    const {username, password} = req.body;
    
    try {
        //To check if user exists
        const userExists = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(409).send('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query('INSERT INTO users (username, hashed_password, profile_picture_url) VALUES ($1, $2, $3) RETURNING id, username', [username, hashedPassword, "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"]);
        const newUser = result.rows[0];
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error occured during registration'});
    }
};