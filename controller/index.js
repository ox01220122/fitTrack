const userData = require("../model");

//GET localhost:8000 (전체 데이터 -> index가 render될 때마다 모든 데이터를 불러와 게시글 창 생성)
exports.main = (req, res) => {
  userData.MsearchAll((searchAllData) => {
    userData.MbestPost((bestPost) => {
      userData.MsigninUser((signinUser) => {
        res.render("index", { searchAllData, bestPost, signinUser });
      });
    });
  });
};

//GET localhost:8000/write
exports.write = (req, res) => {
  userData.MsigninUser((signinUser) => {
    console.log("확인", signinUser);
    res.render("write", { signinUser });
  });
};

//POST localhost:8000/write
// exports.Cwrite = (req, res) => {
//   userData.Mwrite(req.body, (err, rows) => {
//     res.send({ result: true });
//   });
// };
exports.Cwrite = (req, res) => {
  userData.Mwrite(req.body);
};

//GET localhost:8000/list
//(list페이지 렌더링 -> 게시글 전체 보이기에서 list로 바꿔서 보내주기), 데이터 전송
exports.list = (req, res) => {
  userData.MsearchAll((searchAllData) => {
    // console.log("리스트안의 '데이터' ! : ", searchAllData);
    res.render("list", { searchAllData });
  });
};

//GET localhost:8000/search (serch 페이지 렌더링)
exports.search = (req, res) => {
  console.log(req.query.keyword);
  userData.Msearch(req.query.keyword, (searchData) => {
    console.log("서치한 결과:", searchData);
    // const result = value;
    // res.redirect("search", { searchData });
    // res.send({ searchData });
    res.render("search", { searchData });
  });
};

// //POST localhost:8000/search
// exports.Csearch = (req, res) => {
//   userData.Msearch(req.body, (rows) => {
//     res.send({ postData: rows });
//   });
// };

//GET localhost:8000/list/showPost
//list페이지에서 게시글 클릭 시 경로 이동하여 이미지 포함해서 보여주기
// exports.showPost = (req, res) => {
//   //axios로 데이터 받아온거 사용해서 렌더링 해야한다
//   userData.MshowPost(req.query.postId, (showPostData) => {
//     console.log("서치한 결과:", showPostData);
//     res.redirect("showPost", { showPostData });
//   });
// };
exports.showPost = (req, res) => {
  res.render("showPost");
};

//POST localhost:8000/list/showPost
exports.CshowPost = (req, res) => {
  userData.MshowPost(req.body.postId, (showPostData) => {
    console.log("서치한 결과:", showPostData);
    res.render("showPost", { showPostData });
  });
};
