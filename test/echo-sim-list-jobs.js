var inquirer = require("inquirer");
var exec = require('child_process').exec;
var child;

var cmd_part1 = "curl --header \"Authorization: key=AAAAYbAFsSY:APA91bFFN2uA_9N63AqHRpOk7_pv4ZL7VGcrVF9nBUr1b-Z2YzmIRCN6UNYCW_rxN-Nwt1tip_hi647QKHn1EzNMvdei4VrKmmqiTO5tzXeqkxeKqGOGLVKS_uQro9yhTxyETH15W_zg\"" +
" --header \"Content-Type: application/json\" -d '{\"to\": \"";
var token = "f0d14kz9aME:APA91bE-U5O5RpbRX3sAPCf2sPqC321p_hJG1owdRTsXUiUfwTxtMjSi7pelHp1JUBxckadaJr8AaU-8tZRLMg0zGeoy8lJW61K38snM29lWDsbXf05OjoxIL_UjUVYzgtF19vEE60rm\"";
var cmd_part2 = ", \"notification\": {\"title\": \"";
var cmd_title = "card-waiting";
var cmd_part3 = "\", \"body\": ";
//  var cmd_body = "{\"state\": \"state-ready\", \"msg\": \"Escuchando\"}";
var cmd_body = "{\"state\": \"state-ready\", \"msg\": \"Escuchando\"}";
var cmd_part4 =  "}}' https://fcm.googleapis.com/fcm/send";


var squad_questions = [
  {
    type: "list",
    name: "cmd",
    message: "Please enter state command",
    choices: [
      new inquirer.Separator(),
      "beca-list-jobs",
      new inquirer.Separator(),
      "beca-list-jobs-specify-squad",
      new inquirer.Separator()
    ]
  },
  {
    type: 'input',
    name: 'squadId',
    message: 'Please enter the squad Id',
    default: '111'
  }
];

function getSquadInfo(answers) {
  return "{ \"squadId\" : \"" + answers.squadId + "\"}";
};

function getContactInfo(answers) {
  return "{ \"name\" : \"" + answers.name + "\", \"phone\": \"" + answers.phone + "\"}";
};

function getLocationInfo(answers) {
  return  "{ \"street\" : \"" + answers.street + "\"," +
          "  \"city\" : \"" + answers.city + "\"," +
          "  \"state\" : \"" + answers.state + "\"," +
          "  \"zipCode\": \"" + answers.zipcode + "\"}";
};

function getScheduleInfo(answers) {
  return  "{ \"repeatType\" : \"" + answers.repeatType + "\"," +
          "  \"startDate\" : \"" + answers.startDate + "\"," +
          "  \"endDate\" : \"" + answers.endDate + "\"," +
          "  \"startTime\" : \"" + answers.startTime + "\"," +
          "  \"endTime\": \"" + answers.endTime + "\"}";
};

////
//// Change this to enable prompt
////
////
var questions = squad_questions;
var bodyFunc = getSquadInfo;
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
