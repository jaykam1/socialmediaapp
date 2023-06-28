const db = require('../../lib/db');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {user_id, profile_picture_url} = req.body;
        const profilePicture = await db.query(`UPDATE users SET profile_picture_url = $1 WHERE id = $2`, [profile_picture_url, user_id]);
        res.status(200).json(profilePicture);  
    } else {
        res.status(405).json({error: "POST requests only"});
    }
}