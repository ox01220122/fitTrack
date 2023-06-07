const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "kmj",
  password: "1234",
  database: "fittrack",
});

//전체 게시글 가져오기
exports.MsearchAll = (callback) => {
  const query = `SELECT * FROM posts ORDER BY post_id DESC `;
  conn.query(query, (err, rows) => {
    if (err) {
      console.log("err:", err);
    }
    callback(rows);
  });
};

//로그인한 사용자의 정보 가져오기
exports.MsigninUser = (callback) => {
  const query = `SELECT * FROM signin_user `;
  conn.query(query, (err, rows) => {
    if (err) {
      console.log("err:", err);
    }
    callback(rows);
  });
};

//하트수가 많은 게시글 제목 3개 불러오기(main페이지에 띄워주기)
exports.MbestPost = (callback) => {
  const query = `SELECT title, like_count  FROM posts ORDER BY like_count DESC LIMIT 3`;
  conn.query(query, (err, rows) => {
    if (err) {
      console.log("err:", err);
    }
    callback(rows);
  });
};

//게시물 ID, 작성자 ID, 게시물 제목,게시물 내용,작성일, 좋아요 수 데이터베이스에 업로드
// exports.Mwrite = (writeData, callback) => {
//   let query = `INSERT INTO posts (user_id, title, content, created_date, created_time, like_count) VALUES
//     ('${writeData.user_id}', '${writeData.title}', '${writeData.content}', '${writeData.created_date}',
//     '${writeData.created_time}', '${writeData.like_count}')`;

//   conn.query(query, (err, result) => {
//     if (err) {
//       console.log("데이터 저장 오류!!");
//       console.log(err);
//       callback(err); // 오류를 콜백으로 전달
//       return;
//     }
//   });
// };
exports.Mwrite = (writeData) => {
  //형식 안맞아서 저장오류 날 일 없음. 그래서 오류처리 생략.
  let query = `INSERT INTO posts (user_id, title, content, created_date, created_time, like_count) VALUES 
    ('${writeData.user_id}', '${writeData.title}', '${writeData.content}', '${writeData.created_date}',
    '${writeData.created_time}', '${writeData.like_count}')`;
  conn.query(query);
};

//입력한 단어가 포함된 columns search
exports.Msearch = (searchData, callback) => {
  // console.log("model 받아온 데이터 ", searchData);
  const query = `SELECT * FROM posts WHERE title LIKE '%${searchData}%' OR content LIKE '%${searchData}%'`;
  conn.query(query, (err, rows) => {
    if (err) {
      console.log("err:", err);
    }
    console.log("keyword search data(여기는 model!!) : ", rows);
    callback(rows);
  });
};

exports.MshowPost = (postIdData, callback) => {
  const query = `SELECT * FROM posts WHERE post_id = ${postIdData}`;
  conn.query(query, (err, rows) => {
    if (err) {
      console.log("err:", err);
    }
    console.log("post_id일치 데이터 : ", rows);
    callback(rows);
  });
};
