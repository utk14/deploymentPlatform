
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get("/", passport.authenticate('gitlab'));

router.get("/gitlab", passport.authenticate('gitlab'), (req, res) => {
    const authCode = req.query.code;
    res.redirect("/#/newapp?token=" + authCode);
})

module.exports = router;