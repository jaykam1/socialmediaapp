const db = require('../../lib/db');
const pgp = require('pg-promise')();

export default async function handler(req, res) {
    if (req.method=='GET') {
        const {user_id} = req.query;
        const followedUserQuery = pgp.as.format(
            `SELECT followed_id FROM followers WHERE follower_id = ${user_id}`
        );
        const followedUserData = await db.query(followedUserQuery);
        res.status(200).json(followedUserData.rows);
    } else {
        res.status(405).json({ error: 'Non-GET request sent' });
    }
}