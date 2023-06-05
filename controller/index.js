const userData = require("../model");

//GET localhost:8000 (전체 데이터 -> index가 render될 때마다 모든 데이터를 불러와 게시글 창 생성)
exports.main = (req, res) => {
  userData.MsearchAll((value) => {
    res.render("index", { searchAllData: value });
  });
};

//GET localhost:8000/write (write페이지 렌더링)
exports.write = (req, res) => {
  res.render("write");
};

//GET localhost:8000/list (list페이지 렌더링)
exports.list = (req, res) => {
  res.render("list");
};

//GET localhost:8000/search (serch페이지 렌더링)
exports.search = (req, res) => {
  userData.Msearch(req.query, (value) => {
    console.log("controller입니다 : ", value);
    res.render("search", { searchData: value });
  });
};

//POST localhost:8000/write
exports.Cwrite = (req, res) => {
  userData.Mwrite(req.body, (err, rows) => {
    console.log("여기는 controller야! model에서 받은 데이터 출력 :", rows[0]);

    //res.render("index");
    res.send({ result: true });
  });
};

exports.Csearch = (req, res) => {
  userData.Msearch(req.body, (rows) => {
    console.log("여기는 controller야! model에서 받은 데이터 출력 :", rows);
    res.send({ postData: rows });
  });
};
