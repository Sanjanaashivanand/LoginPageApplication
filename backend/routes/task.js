var express = require('express');
const app = express();
const router = express.Router();

const {getAllTasks} = require('../controllers/taskController')

router.get("/get-all",getAllTasks);

module.exports =router;
