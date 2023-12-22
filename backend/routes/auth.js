const express = require("express");
var router = express.Router();
const { check } = require('express-validator');
const {signin,signup,signout,isSignedIn} = require("../controllers/authController")

router.post(
    "/signup",
    [
        check("name", "Name must be 3+ chars long").isLength({ min: 3 }),
        check("email", "Email is required").isEmail(),
        check("password", "Password must contain 8+ chars").isLength({ min: 8 })
    ],
    signup
);

router.post(
    "/signin",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").isLength({ min: 1 })
    ],
    signin
);

router.get("/signout",signout)

//Protected Route for testing
router.get("/testroute",isSignedIn, (req,res) => {
    res.send("A protected route")
});


module.exports = router;