const db = require('../../lib/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

export default async (req, res) => {
    const {username, password} = req.body;

    try {
        const userExists = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = userExists.rows[0];
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }
        const passwordMatches = await bcrypt.compare(password, user.hashed_password);
        if (!passwordMatches) {
            return res.status(400).send('Invalid username or password');
        }
        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Set token as httpOnly cookie
        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // use HTTPS in production
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/'
        }));

        res.status(200).json({message: 'Loggin in successfully'});
    }   catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error occured during login'});
    }
};
