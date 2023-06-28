const db = require('../../lib/db');

export default async function handler(req, res) {
    const {post_id, user_id} = req.query;
    const like = await db.query('SELECT * FROM likes WHERE post_id = $1 AND user_id = $2', [post_id, user_id]);
    const likeStatus = like.rows[0];
    if (likeStatus) {
        res.status(200).json({liked: true});
    } else {
        res.status(200).json({liked: false});
    }
}