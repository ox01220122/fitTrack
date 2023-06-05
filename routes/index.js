const express = require("express");
const controller = require("../controller");
const router = express.Router();

//GET localhost:8000 (index)
router.get("/", controller.main);
//GET localhost:8000/write
router.get("/write", controller.write);
//GET localhost:8000/write
router.post("/write", controller.Cwrite);

//GET localhost:8000/search
router.get("/search", controller.search);
router.post("/search", controller.Csearch);

router.get("/list", controller.list);

//모듈사용
module.exports = router;
