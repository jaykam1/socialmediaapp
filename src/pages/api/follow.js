const db = require('../../lib/db')

export default async function handler(req, res) {
    const {followingId, followerId} = req.body || req.query;
    
    if (req.method === 'POST') {
        console.log(followerId, followingId);
        await db.query(`INSERT INTO followers (follower_id, followed_id) VALUES ($1, $2)`, [followerId, followingId]);
        res.status(200).json({message: 'Followed'});
    } else if (req.method === 'DELETE') {
        console.log(followerId, followingId);
        await db.query(`DELETE FROM followers WHERE follower_id = $1 AND followed_id = $2`, [followerId, followingId]);
        res.status(200).json({ message: 'Unfollowed'});
    }
}