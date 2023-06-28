const db = require('../../lib/db');
const pgp = require('pg-promise')();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {userId, searchTerm} = req.body;

            const usersQuery = pgp.as.format(
                `SELECT id, username, profile_picture_url FROM users WHERE username LIKE '${searchTerm}%' AND id != $1`, [userId]
            );
        
            const users = await db.query(usersQuery);
            
            if (users.rows[0]) {
                res.status(200).json(
                    users.rows
                );
            } else { 
                res.status(200).json({});
            }
            
        
    } else {
        res.status(405).json({ error: 'Non-POST request sent' });
    }
}