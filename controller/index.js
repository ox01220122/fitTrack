const userData = require("../model");

// GET localhost:8000
// 가져오는 데이터: 전체데이터, best3 데이터, 로그인 유저 데이터, 댓글 데이터
exports.main = async (req, res) => {
  const searchAllDataPromise = new Promise((resolve, reject) => {
    userData.MsearchAll((searchResult) => {
      resolve(searchResult);
    });
  });
  const bestPostPromise = new Promise((resolve, reject) => {
    userData.MbestPost((bestPost) => {
      resolve(bestPost);
    });
  });
  const signinUserPromise = new Promise((resolve, reject) => {
    userData.MsigninUser((signinUser) => {
      resolve(signinUser);
    });
  });
  const commentAllDataPromise = new Promise((resolve, reject) => {
    userData.McommentAll((commentAllData) => {
      resolve(commentAllData);
    });
  });

  const [searchAllData, bestPost, signinUser, commentAllData] =
    await Promise.all([
      searchAllDataPromise,
      bestPostPromise,
      signinUserPromise,
      commentAllDataPromise,
    ]);

  await res.render("index", {
    searchAllData: searchAllData,
    bestPost: bestPost,
    signinUser: signinUser,
    commentAllData: commentAllData,
  });
};

// POST localhost:8000
exports.Cmain = (req, res) => {
  userData.writeComment(req.body);
};

// PATCH localhost:8000
exports.CpatchLikeCount = async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      userData.MpatchLikeCount(req.body, (result) => {
        resolve(result);
      });
    });
    res.send({ likeCount: result });
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
};

// ---------------------------------------------------------------------------------------------
//GET localhost:8000/write
exports.write = (req, res) => {
  userData.MsigninUser((signinUser) => {
    res.render("write", { signinUser });
  });
};

//POST localhost:8000/write
exports.Cwrite = (req, res) => {
  userData.Mwrite(req.body);
};
// ---------------------------------------------------------------------------------------------

//GET localhost:8000/list
exports.list = (req, res) => {
  userData.MsearchAll((searchAllData) => {
    res.render("list", { searchAllData });
  });
};
// ---------------------------------------------------------------------------------------------

//GET localhost:8000/search
exports.search = (req, res) => {
  userData.Msearch(req.query.searchInput, (searchData) => {
    const searchInput = req.query.searchInput;
    res.render("search", { searchData, searchInput });
  });
};
// ---------------------------------------------------------------------------------------------

//GET localhost:8000/list/showPost
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
// ---------------------------------------------------------------------------------------------

//GET localhost:8000/myPost
exports.CmyPost = (req, res) => {
  userData.MmyPost(req.query.signinId, (myPostData) => {
    res.render("myPost", { myPostData });
  });
};
