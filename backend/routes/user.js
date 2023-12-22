var express = require('express');
const app = express();
const router = express.Router();
const{getUserById,getUser} = require("../controllers/userController")
const{isSignedIn,isAuthenticated} = require("../controllers/authController")

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

module.exports =router;
