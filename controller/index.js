const userData = require("../model");

//localhost:8000
exports.main = (req, res) => {
  console.log("check");
  userData.MsearchAll((value) => {
    console.log("여기는 controller,전체 데이터 출력 rows !! : ", value);
    res.render("index", { data: value });
  });
};

//localhost:8000/write
exports.write = (req, res) => {
  res.render("write");
};

//localhost:8000/list
exports.list = (req, res) => {
  res.render("list");
};

//localhost:8000/write
exports.Cwrite = (req, res) => {
  userData.Mwrite(req.body, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("여기는 controller야! model에서 받은 데이터 출력 :", rows[0]);

    //res.render("index");
    res.send({ result: true });
  });
};

exports.Csearch = (req, res) => {
  userData.Msearch(req.body, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("여기는 controller야! model에서 받은 데이터 출력 :", rows);
    res.send({ postData: rows });
    // res.render("search", { postData: rows });
  });
};
