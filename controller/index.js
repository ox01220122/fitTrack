const userData = require("../model");

//localhost:8000
// exports.main = (req, res) => {
//   res.render("index");
// };

//localhost:8000/write
exports.write = (req, res) => {
  res.render("write");
};

//localhost:8000/write
exports.Cwrite = (req, res) => {
  userData.Mwrite(req.body, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("여기는 controller야! model에서 받은 데이터 출력 :", rows[0]);
    // const postData = {
    //   post_id: rows[0].post_id,
    //   user_id: rows[0].user_id,
    //   title: rows[0].title,
    //   content: rows[0].content,
    //   created_date: rows[0].created_date.toISOString().split("T")[0],
    //   created_time: rows[0].created_time,
    //   like_count: rows[0].like_count,
    // };
    res.render("index", { postData: rows[0] });

    // res.send({ postData: postData });
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
