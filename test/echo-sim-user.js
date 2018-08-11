var inquirer = require("inquirer");
var exec = require('child_process').exec;
var child;

var cmd_part1 = "curl --header \"Authorization: key=AAAAYbAFsSY:APA91bFFN2uA_9N63AqHRpOk7_pv4ZL7VGcrVF9nBUr1b-Z2YzmIRCN6UNYCW_rxN-Nwt1tip_hi647QKHn1EzNMvdei4VrKmmqiTO5tzXeqkxeKqGOGLVKS_uQro9yhTxyETH15W_zg\"" +
" --header \"Content-Type: application/json\" -d '{\"to\": \"";
var token = "flbOVVsJPQw:APA91bG6z3OAUdRkD0qpxlqMvd3yAZH_GA06Z-gubN6AhNYTAQtdyDawAcuNcMbkM8N7MZwmbFcf7auJsG-fKgfV4u0S-PLXEnO8KwU9Z8Ah1lBuNFz7xZKSrc5PJkAS-0XH9wCnHFim\"";
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
      "beca-create-user",
      new inquirer.Separator(),
      "beca-create-user-name",
      new inquirer.Separator(),
      "beca-create-user-role",
      new inquirer.Separator(),
      "beca-create-user-phone",
      new inquirer.Separator(),
      "beca-create-user-email",
      new inquirer.Separator(),
      "beca-create-user-picture",
      new inquirer.Separator(),
      "beca-create-user-gender",
      new inquirer.Separator(),
      "beca-create-user-submit",
      new inquirer.Separator(),
      "beca-reset"
    ]
  },
  {
    type: 'input',
    name: 'name',
    message: 'Please enter the name',
    default: 'Mr Kevin'
  },
  {
    type: 'input',
    name: 'role',
    message: 'Please enter the role',
    default: 'manager'
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Please enter the phone',
    default: '3102667010'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Please enter the email',
    default: 'q@y.com'
  },
  {
    type: 'input',
    name: 'picture',
    message: 'Please enter the picture url',
    default: 'www.sebeca.com/picture/kenvin.jpg'
  },
  {
    type: 'input',
    name: 'gender',
    message: 'Please enter the gender',
    default: 'male'
  }
];

function getUserInfo(answers) {
  return  "{ \"name\" : \"" + answers.name + "\"," +
          "  \"role\" : \"" + answers.role + "\"," +
          "  \"phone\" : \"" + answers.phone + "\"," +
          "  \"email\" : \"" + answers.email + "\"," +
          "  \"picture\" : \"" + answers.picture + "\"," +
          "  \"gender\": \"" + answers.gender + "\"}";
};

////
//// Change this to enable prompt
////
////
var questions = questions;
var bodyFunc = getUserInfo;
////
////
////
////

inquirer.prompt(questions).then(function(answers) {
  console.log(JSON.stringify(answers, null, '  '));
  cmd_title = answers.cmd;
  cmd_body = bodyFunc(answers);

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
