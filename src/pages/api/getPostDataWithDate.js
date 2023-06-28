const db = require('../../lib/db');
const pgp = require('pg-promise')();

export default async function handler(req, res) {
    if (req.method=='GET') {
        const {user_id} = req.query;
        const postDataQuery = pgp.as.format(
            `SELECT post_id, user_id, post_date FROM posts WHERE user_id = ${user_id} ORDER BY post_date DESC`
        );
        const postData = await db.query(postDataQuery);
        res.status(200).json(postData.rows);


    } else {
        res.status(405).json({ error: 'Non-GET request sent' });
    }

}