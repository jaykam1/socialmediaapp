const db = require('../../lib/db')

export default async function handler(req, res) {
    const {post_id, user_id} = req.body || req.query;
    
    if (req.method === 'POST') {
        console.log(post_id, user_id);
        await db.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2)`, [post_id, user_id]);
        res.status(200).json({message: 'Liked'});
    } else if (req.method === 'DELETE') {
        console.log(post_id, user_id);
        await db.query(`DELETE FROM likes WHERE post_id = $1 AND user_id = $2`, [post_id, user_id]);
        res.status(200).json({ message: 'Unliked'});
    }
}