const db = require('../../lib/db');
const pgp = require('pg-promise')();

export default async function handler(req, res) {
    if (req.method=='GET') {
        const {user_id, followed_id} = req.query;
        const messageHistoryQuery = pgp.as.format(
            `SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2)
             OR (sender_id = $2 AND receiver_id = $1)
             ORDER BY sent_date ASC`, [user_id, followed_id]
        );
        const messageHistoryData = await db.query(messageHistoryQuery);
        res.status(200).json(messageHistoryData.rows);
    } else {
        res.status(405).json({ error: 'Non-GET request sent' });
    }
}