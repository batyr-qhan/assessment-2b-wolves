const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
// const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');

const saltRounds = 10;

/* GET home page. */
router.get('/', (req, res) => {
  // const { user } = req.session;
  // res.render('index', { user });
  res.redirect('/parties');
});

router
  .route('/registration')
  .get((req, res) => {
    const { message } = req.query;
    res.render('registration', { message });
  })
  .post(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({
        email,
        username,
        password: await bcrypt.hash(password, saltRounds),
      });

      const dbusername = await User.findOne({ username });
      const dbemail = await User.findOne({ email });
      if (dbusername && dbusername.username === username) {
        const message = 'Username is already used, please choose another';
        res.redirect(`/registration?message=${message}`);
      } else if (dbemail && dbemail.email === email) {
        const message = 'Email is already used, please choose another';
        res.redirect(`/registration?message=${message}`);
      } else {
        await user.save();
        req.session.user = user;
        res.redirect('/');
      }

      // await user.save();
      // req.session.user = user;
      // res.redirect('/entries');
    } catch (error) {
      res.redirect('/registration');
    }
  });

router
  .get('/login', (req, res) => {
    const { message } = req.query;
    res.render('login', { message });
  })
  .post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.redirect('/');
    } else {
      const message =
        'You are not authorized, please check your username or password!';
      res.redirect(`/login?message=${message}`);
    }
  });

router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
