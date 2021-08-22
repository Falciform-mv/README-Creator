// TODO: Include packages needed for this application
const { rejects } = require('assert');
const fs= require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is your project title?',
    validate: function(nameInput) {
      if (nameInput) {
        return true;
      } else {
        return ('Please enter project title')
      }
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description',
  },
  {
    type: 'input',
    name: 'contents',
    message: 'list table of contents?',
  },
  {
    type: 'list',
    name: 'licenses',
    message: 'Which licenses should your project have?',
    choices: [
      'MIT',
      'Apache 2.0',
      'GPL 3.0',
      'BSD3',
      'None'
    ]
  }

];


// `# ${response.title}
  
// # Description
// ${response.description}
// `
// TODO: Create a function to write README file
function writeToFile(fileName, response) {
    fs.writeFile(fileName, response, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("Success");
    })

  }
 

// TODO: Create a function to initialize app
function init() {
  return inquirer
    .prompt(questions);
}

// Function call to initialize app
init()
.then(function(readmeData) {
  return generateMarkdown(readmeData);
})
.then(function(pageMarkdown) {
  return writeToFile('README.md', pageMarkdown);
})
