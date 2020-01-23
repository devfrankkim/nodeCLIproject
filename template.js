#!/usr/bin/env node

// **package.json 이 바뀌면, 설치를 다시한번 해줘야 한다.
// 코드를 반복해서 쓰는 것을 방지하기 위함. 자주 쓰는 코드 repeat.

// 폴더 생성, 파일 생성
const fs = require("fs");
const path = require("path");

// process.argv[2] => users program (사용자 input) // process.argv[1] => current file path // process.argv[0] => node install path
const type = process.argv[2]; // html or router
const name = process.argv[3]; // file name
const directory = process.argv[4] || "."; // file direcotry, 사람이 안넣어주면 현재 폴더로 넣는다. => || '.'

//HTML template
const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Template</title>
</head>
<body>
  <h1>Hello</h1>
  <p>CLI</p>
</body>
</html>`;

const routerTemplate = `const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;`;

// *폴더가 존재하는지 여부*
const exist = dir => {
  try {
    fs.accessSync(
      dir,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
    );
    return true;
  } catch (e) {
    return false;
  }
};

// File DIRECTORY-OK / READ-OK / WRITE-OK => 가능한지 체크.

// *순차적으로 폴더 만들기.*
const mkdirp = dir => {
  // ex) (html 현재 폴더)  // (html/css/js/kim 사용자 입력)  => 상대 경로 ./css/js/kim
  const dirname = path
    .relative(".", path.normalize(dir)) // "." 현재 폴더 + "path.normalize(dir)" 사용자 입력한 경로 => 상대 경로 => ./css/js/kim
    .split(path.sep) // ./css/js/kim.split(path.sep) => [css, js, kim]
    .filter(p => !!p); // in case, there is "undefined" in Array , filter will remove "undefined" in Array.
  dirname.forEach((d, idx) => {
    // dirname => [css, js, kim]
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep); // ["css"] , ["css", "js"], ["css", "js", "kim"]
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makerTemplate = () => {
  mkdirp(directory); // file 경로 받아서 만든다. const directory = process.argv[4] || ".";
  if (type === "html") {
    const pathToFile = path.join(directory, `${name}.html`);
    // folder directory + file name => file path
    if (exist(pathToFile)) {
      console.error("이미 해당 파일이 존재한다."); // 이미 있는 파일을 생성하면, 충돌이 나기 때문이다.
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, "생성 완료");
      // 파일 경로 + HTML template , if you use only once , you can use Sync. It can be blocking other requests.
      // in CLI program, you only type once in terminal, so it is okay to use Sync.
    }
  } else if (type === "express-router") {
    const pathToFile = path.join(directory, `${name}.js`); // folder directory + file name => file path
    if (exist(pathToFile)) {
      console.error("이미 해당 파일이 존재한다."); // 이미 있는 파일을 생성하면, 충돌이 나기 때문이다.
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, "생성 완료");
    }
  } else {
    console.error("pick either HTML or express-router");
  }
};

const program = () => {
  if (!type || !name) {
    console.error(
      "사용방법: 1)cli html||express-router, 2)파일명, 3)[생성 경로]" // [] 옵션 => 넣어도 되고, 안넣어도 된다.
    );
  } else {
    makerTemplate(); // sucessful
  }
};

program();
// cli html main public/html
// cli html main
// cli express-router index ./routes
