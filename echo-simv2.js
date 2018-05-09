var inquirer = require("inquirer");
var exec = require('child_process').exec;
var child;

var cmd_part1 = "curl --header \"Authorization: key=AAAAYbAFsSY:APA91bFFN2uA_9N63AqHRpOk7_pv4ZL7VGcrVF9nBUr1b-Z2YzmIRCN6UNYCW_rxN-Nwt1tip_hi647QKHn1EzNMvdei4VrKmmqiTO5tzXeqkxeKqGOGLVKS_uQro9yhTxyETH15W_zg\"" +
" --header \"Content-Type: application/json\" -d '{\"to\": \"";
var token = "dz5NwnDM4m4:APA91bGULn2wfHtHHON_8zNumi2UX8Xdxus56rejbu0mXnIUe_rlNLez8DYURuGXvaT0PG322GuVjZnL0vNy0LGZH6SPHT8_Y4M3P0MnGNji3UVE-GgczjJxMipJ80uYugwacSYW-4tI\"";
var cmd_part2 = ", \"notification\": {\"title\": \"";
var cmd_title = "card-waiting";
var cmd_part3 = "\", \"body\": ";
//  var cmd_body = "{\"state\": \"state-ready\", \"msg\": \"Escuchando\"}";
var cmd_body = "{\"state\": \"state-ready\", \"msg\": \"Escuchando\"}";
var cmd_part4 =  "}}' https://fcm.googleapis.com/fcm/send";

var questions = [
  {
    type: "list",
    name: "cmd",
    message: "Please enter state command",
    choices: [
      new inquirer.Separator(),
      "beca-list-jobs",
      new inquirer.Separator(),
      "beca-list-jobs-specify-squad"
    ]
  },
  {
    type: 'input',
    name: 'squad',
    message: 'Please enter the squad ID',
    default: '111'
  }
];

inquirer.prompt(questions).then(function(answers) {
  console.log(JSON.stringify(answers, null, '  '));
  cmd_title = answers.cmd;
  cmd_body = "{\"squad\": \"" + answers.squad +"\"}";

  let curlCmd = cmd_part1 + token + cmd_part2 + cmd_title + cmd_part3 + cmd_body + cmd_part4;
  console.log(curlCmd);
  child = exec(curlCmd, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}).catch(function(err) {
  console.error(err);
});
// //http://enzolutions.com/articles/2014/09/08/how-to-create-an-interactive-command-in-node-js/