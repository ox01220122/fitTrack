const userData = require("../model");

// GET localhost:8000 (전체 데이터 -> index가 render될 때마다 모든 데이터를 불러와 게시글 창 생성)
exports.main = (req, res) => {
  userData.MsearchAll((searchAllData) => {
    userData.MbestPost((bestPost) => {
      userData.MsigninUser((signinUser) => {
        res.render("index", { searchAllData, bestPost, signinUser });
      });
    });
  });
};

// exports.main = (req, res) => {
//   const searchInput = req.query.searchInput;

//   if (searchInput) {
//     // searchInput이 존재하는 경우 Msearch 함수 실행
//     userData.Msearch(searchInput, (searchAllData) => {
//       userData.MbestPost((bestPost) => {
//         userData.MsigninUser((signinUser) => {
//           res.render("index", {
//             searchAllData,
//             bestPost,
//             signinUser,
//             msg: true,
//           });
//         });
//       });
//     });
//   } else {
//     // searchInput이 존재하지 않는 경우 MsearchAll, MbestPost, MsigninUser 함수 실행
//     userData.MsearchAll((searchAllData) => {
//       userData.MbestPost((bestPost) => {
//         userData.MsigninUser((signinUser) => {
//           res.render("index", {
//             searchAllData,
//             bestPost,
//             signinUser,
//             msg: false,
//           });
//         });
//       });
//     });
//   }
// };

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
  console.log("search 테스트", req.query.postIdArr);
  userData.Msearch(req.query.searchInput, (searchData) => {
    res.render("search", { searchData });
  });
};

// // //POST localhost:8000/search
// exports.Csearch = (req, res) => {
//   userData.Msearch(req.body.keyword, (searchData) => {
//     res.send({ result: searchData });
//   });
// };

//GET localhost:8000/list/showPost
// list페이지에서 게시글 클릭 시 경로 이동하여 이미지 포함해서 보여주기
exports.showPost = (req, res) => {
  userData.MshowPost(req.query.postId, (showPostData) => {
    res.render("showPost", { showPostData });
  });
};

//POST localhost:8000/list/showPost
exports.CshowPost = (req, res) => {
  userData.MshowPost(req.body.postId, (showPostData) => {
    console.log("서치한 결과:", showPostData);
    res.send({ result: showPostData[0].post_id });
  });
};
