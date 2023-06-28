const cookie = require('cookie');

export default (req, res) => {
  // Clear the cookie
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // use HTTPS in production
    sameSite: 'strict',
    expires: new Date(0),
    path: '/'
  }));

  res.status(200).json({ message: 'Logged out' });
};