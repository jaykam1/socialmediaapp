const db = require('../../lib/db');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {sender_id, message_content, receiver_id} = req.body;
        const now = new Date().toISOString().replace("T", " ").slice(0, 19);
        const newMessage = await db.query('INSERT INTO messages (sender_id, receiver_id, message_content, sent_date) VALUES ($1, $2, $3, $4) RETURNING *', [sender_id, receiver_id, message_content, now]);
        res.status(200).json(newMessage);  
    } else {
        res.status(405).json({error: "POST requests only"});
    }
}