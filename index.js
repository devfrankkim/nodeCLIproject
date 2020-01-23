#!/usr/bin/env node
// 노드 프로그램이 이 경로에 설치가 되어 있다.

/* 
만약 이 프로그램이 cli 프로그램이라면, bin에서 cli 명령어를 치면 index.js 를 실행해라. 

"bin": {
    "cli": "./index.js"
  }

  npm i -g 하는 순간 node cli 프로그램이 된다.
  npm i -g => global 설치하는 명령어
  node i -g (어떤 패키지인지 안 적어주면 *현재 패키지만* 전역설치가 됨.)
  전역 설치가 되는 순간 CLI프로그램이 됨.
  npm i -g rimraf  => rimraf 명령어를 여기서 쓸 수 있음.

  패키지 명과 cli는 꼭 같을 필요가 없다.
  name: node-cli
  명령어: cli

  express 

*/

/* 

console.log("Hello CLI", process.argv);

process.argv => 사용자가 입력한 내용을 배열로 출력한다.

[ '/usr/local/bin/node', '/usr/local/bin/cli' ]
process.argv[0]: 노드 설치 경로 (노드가 설치된 경로) node install pwd 
process.argv[1]: 파일 위치 경로 (index.js 가 위치한 경로)  file location pwd
***** 
NODE-CLI/index.js 가 아님. 
=> 노드 전역 모듈, 전역 패키지들이 설치된 그 안에 있는 node.moduels/NODE-CLI/index.js


"cli"를 치면, './index.js' 를 참조함.
따라서, index.js 에서 수정한 파일들이 알아서 수정이 됨.

argv,  사용가 입력한 것을 받아서 출력을 할 수 있다.
cli hello haha hehe 
=> 
[ 
  '/usr/local/bin/node', => node설치된 경로
  '/usr/local/bin/cli', => 현재 index.js 경로
  'hello', 
  'haha',
  'hehe' 
]
*/

/*

*/

const readline = require("readline");

// interface => 사용자와, 컴퓨터 사이의 소통 창고
const rl = readline.createInterface({
  input: process.stdin, // standard input => 터미널에서 적는 것.
  output: process.stdout // 해당 결과가 출력되는 것.
});

console.clear(); // 터미널이 clear 된다.
const answerCallback = answer => {
  // 재귀함수로 받는다. 다시 질문을 받아서 답변하기 위해서.
  // rl 안에는 question메서드가 장착되어 있다 .사용자와 상호작용을 할 수 있다.
  // answer로 콜백을 받음.
  // rl.close(); 답변 다했으면 close()로 interface를 종료한다.

  if (answer === "y") {
    console.log("Thank you!!!");
    rl.close();
  } else if (answer === "n") {
    console.log("Sorry about that! you have to enjoy it though!!!");
    rl.close();
  } else {
    console.clear();
    console.log("Think again");
    console.log("You should input y or n");
    rl.question("Are you having fun? (y/n)", answerCallback);
  }
};
rl.question("Are you having fun? (y/n)", answerCallback);
