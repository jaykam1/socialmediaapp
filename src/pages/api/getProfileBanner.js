const db = require('../../lib/db');
const pgp = require('pg-promise')();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const {user_id} = req.query;

            const userDetailsQuery = pgp.as.format(
                `SELECT id, username, profile_picture_url FROM users WHERE id = $1`, [user_id]
            );
            const userData = await db.query(userDetailsQuery);
            const profilePicture = userData.rows[0].profile_picture_url
            
            res.status(200).json({
                username: userData.rows[0].username,
                profilePicture: profilePicture,
                id: userData.rows[0].id,
            });
        
    } else {
        res.status(405).json({ error: 'Non-GET request sent' });
    }
}