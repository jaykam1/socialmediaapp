const db = require('../../lib/db');

export default async function handler(req, res) {
    const {user_id} = req.query;
    const usernameData = await db.query(`SELECT username FROM users WHERE id = $1`, [user_id]);
    const username = usernameData.rows[0].username;
    res.status(200).json(username);
}