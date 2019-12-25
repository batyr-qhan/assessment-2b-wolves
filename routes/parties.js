const express = require('express');

const router = express.Router();
const Party = require('../models/partySchema');

console.log('started entries');

// entries
router.get('/', async (req, res, next) => {
  const { user } = req.session;
  const parties = await Party.find();
  // console.log(entries);
  res.render('parties/index', { parties, user });
});

router.post('/', async (req, res, next) => {
  const newParty = new Party({
    name: req.body.name,
    location: req.body.location,
    date: req.body.date,
    author: req.body.author,
  });
  newParty.save();
  res.redirect(`/parties/${newParty.id}`);
});

// new entries
router.get('/new', (req, res, next) => {
  const { user } = req.session;
  res.render('parties/new', { user });
});

// detail entry
router
  .route('/:id')
  .get(async (req, res, next) => {
    const { user } = req.session;
    const party = await Party.findById(req.params.id);
    res.render('parties/show', { party, user });
  })
  .put(async (req, res, next) => {
    // const { id } = req.params;
    // const { name } = req.body;
    // const { location } = req.body;
    // const { date } = req.body;

    // await Party.updateOne({ _id: id }, { name, location, date });

    // const party = await Party.findById(req.params.id);

    const party = await Party.findById(req.params.id);

    party.name = req.body.name;
    party.location = req.body.location;
    await party.save();

    res.redirect(`/entries/${party.id}`);

    // party.title = req.body.title;
    // party.body = req.body.body;
    // await party.save();

    res.redirect(`/parties/${party.id}`);
  })
  .delete(async (req, res, next) => {
    await Party.deleteOne({ _id: req.params.id });
    res.redirect('/');
  });

router.get('/:id/edit', async (req, res, next) => {
  const { user } = req.session;
  const party = await Party.findById(req.params.id);
  res.render('parties/edit', { party, user });
});
module.exports = router;
