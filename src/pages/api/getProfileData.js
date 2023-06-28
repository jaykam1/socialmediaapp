const db = require('../../lib/db');
const pgp = require('pg-promise')();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const {user_id} = req.query;

            const userDetailsQuery = pgp.as.format(
                `SELECT username, profile_picture_url FROM users WHERE id = $1`, [user_id]
            );
            
            const followerCountQuery = pgp.as.format(
                `SELECT COUNT(*) FROM followers WHERE followed_id = $1`, [user_id]
            );
            
            const followingCountQuery = pgp.as.format(
                `SELECT COUNT(*) FROM followers WHERE follower_id = $1`, [user_id]
            );

            const postsCountQuery = pgp.as.format(
                `SELECT COUNT(*) FROM posts WHERE user_id = $1`, [user_id]
            );

            const userData = await db.query(userDetailsQuery);
            const followerCount = await db.query(followerCountQuery);
            const followingCount = await db.query(followingCountQuery);
            const postsCount = await db.query(postsCountQuery);

            const profilePicture = userData.rows[0].profile_picture_url
            
            res.status(200).json({
                username: userData.rows[0].username,
                profilePicture: profilePicture,
                followerCount: followerCount.rows[0].count,
                followingCount: followingCount.rows[0].count,
                postCount: postsCount.rows[0].count,
            });
        
    } else {
        res.status(405).json({ error: 'Non-GET request sent' });
    }
}