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

//게시물 ID, 작성자 ID, 게시물 제목,게시물 내용,작성일, 좋아요 수 데이터베이스에 업로드
exports.Mwrite = (writeData, callback) => {
  let query = `INSERT INTO posts (user_id, title, content, created_date, created_time, like_count) VALUES 
    ('${writeData.user_id}', '${writeData.title}', '${writeData.content}', '${writeData.created_date}',
    '${writeData.created_time}', '${writeData.like_count}')`;

  conn.query(query, (err, result) => {
    if (err) {
      console.log("데이터 저장 오류!!");
      console.log(err);
      callback(err); // 오류를 콜백으로 전달
      return;
    }
    //제일 최근 게시글 하나 가져오는 쿼리문!
    // query = `SELECT * FROM posts WHERE post_id = (SELECT MAX(post_id) FROM posts WHERE user_id='${writeData.user_id}')`;
    // conn.query(query, (err, rows) => {
    //   if (err) {
    //     console.log(err);
    //     // callback(err);
    //     return;
    //   }
    //   console.log("여기는 model에서 controller로 보내는 데이터야 !!", rows);
    //   callback(null, rows);
    // });
  });
};

//입력한 단어가 포함된 columns search
exports.Msearch = (searchData, callback) => {
  const query = `SELECT * FROM posts WHERE title LIKE '%${searchData}%' OR content LIKE '%${searchData}%'`;
  conn.query(query, (err, rows) => {
    if (err) {
      console.log("err:", err);
    }
    console.log("keyword search data(여기는 model!!) : ", rows);
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
    console.log("좋아요 많은 3개 : ", rows);
    callback(rows);
  });
};

// //전체 post_id, 게시글의 제목,날짜, 시간 가져오기
// exports.Mlist = (callback) => {
//   const query = `SELECT post_id, title,created_date,created_time FROM posts ORDER BY post_id DESC `;
//   conn.query(query, (err, rows) => {
//     if (err) {
//       console.log("err:", err);
//     }
//     callback(rows);
//   });
// };
