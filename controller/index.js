const userData = require("../model");

// GET localhost:8000
// 가져오는 데이터: 전체데이터, best3 데이터, 로그인 유저 데이터, 댓글 데이터
exports.main = async (req, res) => {
  //전체 데이터
  const searchAllDataPromise = new Promise((resolve, reject) => {
    userData.MsearchAll((searchResult) => {
      resolve(searchResult);
    });
  });
  const bestPostPromise = new Promise((resolve, reject) => {
    //best3 게시물 데이터
    userData.MbestPost((bestPost) => {
      resolve(bestPost);
    });
  });
  const signinUserPromise = new Promise((resolve, reject) => {
    //로그인한 사용자의 데이터
    userData.MsigninUser((signinUser) => {
      resolve(signinUser);
    });
  });
  const commentAllDataPromise = new Promise((resolve, reject) => {
    //전체 댓글 정보
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
// 게시글 데이터, 게시글의 댓글 데이터,로그인 user(쿼리스트링으로 postId보냄)
exports.showPost = async (req, res) => {
  const PshowPost = new Promise((resolve, reject) => {
    userData.MshowPost(req.query.postId, (showPost) => {
      resolve(showPost);
    });
  });

  const PshowPostComment = new Promise((resolve, reject) => {
    userData.MshowPostComment(req.query.postId, (showPostComment) => {
      resolve(showPostComment);
    });
  });

  const PsigninUser = new Promise((resolve, reject) => {
    userData.MsigninUser((signinUser) => {
      resolve(signinUser);
    });
  });

  const [showPost, showPostComment, signinUser] = await Promise.all([
    PshowPost,
    PshowPostComment,
    PsigninUser,
  ]);
  await res.render("showPost", {
    showPost: showPost,
    showPostComment: showPostComment,
    signinUser: signinUser,
  });
};

//POST localhost:8000/list/showPost
exports.CshowPost = (req, res) => {
  userData.writeComment(req.body);
  userData.MshowPost(req.body.post_id, (showPostData) => {
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
