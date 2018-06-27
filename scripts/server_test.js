var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  console.log("request:", request.url);
  let url = request.url;
  response.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Content-Type,Access-Token",
    "Access-Control-Expose-Headers": "*"
  });
  if (url.indexOf('/login') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        name: 'user001',
        setting: 0,
      }
    }))
  } else if (url.indexOf('/logout') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: true
    }))
  } else if (url.indexOf('/collect') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: true
    }))
  } else if (url.indexOf('/recite4_next') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        present_no: 154, // 之后一个应该背诵的单词序号
        today_words: {
          word: 'Hi',
          desc: 'Hi is a word',
          collected: false
        } // 之后一个要背诵的单词
      }
    }))
  } else if (url.indexOf('/recite4') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        counter: 80, //背诵计划设置的量
        present_no: 153, // 应该背诵的第一个单词的序号
        today_no: 101, //今天应该背诵的第一个单词的序号
        today_words: {
          word: 'Hello1',
          desc: 'Hello1 is a word',
          collected: false
        } // 今天第一个要背诵的单词
      }
    }))
  } else if (url.indexOf('/recite6_next') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        present_no: 104, // 之后一个应该背诵的单词序号
        today_words: {
          word: 'CET6Hi',
          desc: 'CET6 Hi is a word',
          collected: false
        } // 之后一个要背诵的单词
      }
    }))
  } else if (url.indexOf('/recite6') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        counter: 100, //背诵计划设置的量
        present_no: 103, // 应该背诵的第一个单词的序号
        today_no: 101, //今天应该背诵的第一个单词的序号
        today_words: {
          word: 'CET6 Hello1',
          desc: 'CET6 Hello1 is a word',
          collected: false
        } // 今天第一个要背诵的单词
      }
    }))
  } else if (url.indexOf('/plan') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: true
    }))
  } else if (url.indexOf('/list4') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        words_list: [{
          word: 'Apple',
          desc: 'n. \n11苹果',
          catalog: '1'
        }, {
          word: 'Pear',
          desc: 'n. 梨',
          catalog: '2'
        }]
      }
    }))
  } else if (url.indexOf('/review4') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        words_list: [{
          word: 'Apple',
          desc: 'n. \n11苹果',
          catalog: '1'
        }, {
          word: 'Pear',
          desc: 'n. 梨',
          catalog: '2'
        }]
      }
    }))
  } else if (url.indexOf('/review6') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        words_list: [{
          word: '111Apple',
          desc: 'n. \n11苹果',
          catalog: '1'
        }, {
          word: '111Pear',
          desc: 'n. 梨',
          catalog: '2'
        }]
      }
    }))
  } else if (url.indexOf('/test4') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        words_list: Array(10).fill({
          word: 'Apple',
          desc: 'n. \n11苹果',
          catalog: '1'
        }, {
          word: 'Pear',
          desc: 'n. 梨',
          catalog: '2'
        })
      }
    }))
  } else if (url.indexOf('/test6') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: {
        words_list: [{
          word: '111Apple',
          desc: 'n. \n11苹果',
          catalog: '1'
        }, {
          word: '111Pear',
          desc: 'n. 梨',
          catalog: '2'
        }]
      }
    }))
  }

}).listen(5007);
console.log("server running at port 5007...");