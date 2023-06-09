const express = require("express");
const controller = require("../controller");
const router = express.Router();

//GET localhost:8000 (index)
router.get("/", controller.main);
//POST localhost:8000 (index)
router.post("/", controller.Cmain);
//PATCH localhost:8000 (index)
router.patch("/", controller.CpatchLikeCount);

//GET localhost:8000/write
router.get("/write", controller.write);
//POST localhost:8000/write
router.post("/write", controller.Cwrite);

//GET localhost:8000/search
router.get("/search", controller.search);
//POST localhost:8000/search
// router.post("/search", controller.Csearch);

//GET localhost:8000/list
router.get("/list", controller.list);

//GET localhost:8000/list/showPost
router.get("/list/showPost", controller.showPost);
//POST localhost:8000/list/showPost
router.post("/list/showPost", controller.CshowPost);

//GET localhost:8000/myPost
router.get("/myPost", controller.CmyPost);

//모듈사용
module.exports = router;
