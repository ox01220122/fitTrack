-- table은 생성하고 오래키는 설정 안한 상태 

-- Create the Post table
CREATE TABLE posts (
  post_id  INT PRIMARY KEY AUTO_INCREMENT,
  author_id VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  content  TEXT NOT NULL,
  created_date DATE NOT NULL,
  like_count INT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES user(user_id)
);

-- Create the Comment table
CREATE TABLE comments (
  comment_id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  post_id  VARCHAR(100) NOT NULL,
  author_id VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_date DATE NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(post_id),
  FOREIGN KEY (author_id) REFERENCES user(user_id)
);

-- Create the User table
CREATE TABLE user (
  userindex INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id  VARCHAR(100) NOT NULL,
  user_name  VARCHAR(100) NOT NULL,
  user_password  DATE NOT NULL,
  profile_picture NOT NULL LONGBLOB,
);