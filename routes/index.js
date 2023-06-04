const express = require("express");
const controller = require("../controller");
const router = express.Router();

//GET localhost:8000
// router.get("/", controller.main);

//GET localhost:8000/write
router.get("/write", controller.write);
//GET localhost:8000/write
router.post("/write", controller.Cwrite);

//GET localhost:8000/search
router.post("/search", controller.Csearch);

//모듈사용
module.exports = router;
