const db = require('../../lib/db');

export default async function handler(req, res) {
    const {followerId, followingId} = req.query;
    const follows = await db.query('SELECT * FROM followers WHERE follower_id = $1 AND followed_id = $2', [followerId, followingId]);
    const followStatus = follows.rows[0];
    if (followStatus) {
        res.status(200).json({following: true});
    } else {
        res.status(200).json({following: false});
    }
}