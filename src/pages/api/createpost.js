const db = require('../../lib/db');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {userId, description, imageUrl} = req.body;
        const now = new Date().toISOString().replace("T", " ").slice(0, 19);
        const newPost = await db.query('INSERT INTO posts (user_id, post_content, photo_url, post_date) VALUES ($1, $2, $3, $4) RETURNING *', [userId, description, imageUrl, now]);
        res.status(200).json(newPost);  
    } else {
        res.status(405).json({error: "POST requests only"});
    }
}
