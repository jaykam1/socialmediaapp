const db = require('../../lib/db');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {user_id, post_id, comment_content} = req.body;
        const now = new Date().toISOString().replace("T", " ").slice(0, 19);
        const newComment = await db.query('INSERT INTO comments (user_id, post_id, comment_content, comment_date) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, post_id, comment_content, now]);
        res.status(200).json(newComment);  
    } else {
        res.status(405).json({error: "POST requests only"});
    }
}