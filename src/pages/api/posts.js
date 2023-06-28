const db = require('../../lib/db');

export default async function handler(req, res) {
    const {post_id} = req.query;

    const postData = await db.query(`SELECT photo_url, post_content, post_date FROM posts WHERE post_id = ${post_id} `);
    const commentData = await db.query(`SELECT user_id, comment_content, comment_date FROM comments WHERE post_id = ${post_id} ORDER BY comment_date DESC`);

    res.status(200).json({
        photo_url: postData.rows[0].photo_url,
        post_content: postData.rows[0].post_content,
        post_date: postData.rows[0].post_date,
        comments: commentData.rows,
    });
}