var inquirer = require("inquirer");
var exec = require('child_process').exec;
var child;

var cmd_part1 = "curl --header \"Authorization: key=AAAAYbAFsSY:APA91bFFN2uA_9N63AqHRpOk7_pv4ZL7VGcrVF9nBUr1b-Z2YzmIRCN6UNYCW_rxN-Nwt1tip_hi647QKHn1EzNMvdei4VrKmmqiTO5tzXeqkxeKqGOGLVKS_uQro9yhTxyETH15W_zg\"" +
" --header \"Content-Type: application/json\" -d '{\"to\": \"";
var token = "fLYFYJ_ZEZM:APA91bHL0Cq96qO4ob95Zr_6sQ83SL-3uzhhalUSWV01njphFAtWgDkxBMNffcHtilOO8PUwu3qhhj1YNNGwnL08EBE-3OqovZULbcTf77aV_38oIV76f8nk9hwZLjLdOoCbjuPdW3RY\"";
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
      "beca-create-job",
      new inquirer.Separator(),
      "beca-create-job-squad-id",
      new inquirer.Separator()
    ]
  },
  {
    type: 'input',
    name: 'squadId',
    message: 'Please enter the squad Id',
    default: 's78999'
  }
];

var schedule_questions = [
  {
    type: "list",
    name: "cmd",
    message: "Please enter state command",
    choices: [
      new inquirer.Separator(),
      "beca-create-job",
      new inquirer.Separator(),
      "beca-create-job-schedule",
      new inquirer.Separator(),
      "beca-create-job-submit"
    ]
  },
  {
    type: 'input',
    name: 'repeatType',
    message: 'Please enter repeat type',
    default: 'weekly'
  },
  {
    type: 'input',
    name: 'startDate',
    message: 'Please enter start date',
    default: '2018-05-05'
  },
  {
    type: 'input',
    name: 'endDate',
    message: 'Please enter end date',
    default: '2018-05-04'
  },
  {
    type: 'input',
    name: 'startTime',
    message: 'Please enter startTime',
    default: '3:00AM'
  },
  {
    type: 'input',
    name: 'endTime',
    message: 'Please enter end time',
    default: '5:00PM'
  }
];

var location_questions = [
  {
    type: "list",
    name: "cmd",
    message: "Please enter state command",
    choices: [
      new inquirer.Separator(),
      "beca-create-job",
      new inquirer.Separator(),
      "beca-create-job-location"
    ]
  },
  {
    type: 'input',
    name: 'street',
    message: 'Please enter street',
    default: '357 Doty Ave'
  },
  {
    type: 'input',
    name: 'city',
    message: 'Please enter city',
    default: 'Hawthorne'
  },
  {
    type: 'input',
    name: 'state',
    message: 'Please enter state',
    default: 'California'
  },
  {
    type: 'input',
    name: 'zipcode',
    message: 'Please enter zip code',
    default: '90250'
  }
];

var contact_questions = [
  {
    type: "list",
    name: "cmd",
    message: "Please enter state command",
    choices: [
      new inquirer.Separator(),
      "beca-create-job",
      new inquirer.Separator(),
      "beca-create-job-contact",
    ]
  },
  {
    type: 'input',
    name: 'name',
    message: 'Please enter name',
    default: 'Mr. X'
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Please enter phone number',
    default: '(310) 333 5050'
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