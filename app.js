const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var teamMembers = [];

function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers))
};

function questionList() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Choose a team member to add:",
        choices: [
            "Add an engineer",
            "Add an intern",
            "I'm done"
        ]
    }).then(function (answers) {
        switch (answers.choice) {
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            case "Build Team":
                buildTeam();
                break;
        }
    });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function createManager() {

    inquirer.prompt(

        [{
            type: "input",
            message: "Please provide manager name:",
            name: "managerName",
        },
        {
            type: "input",
            message: "Please provide manager id:",
            name: "managerId"
        },
        {
            type: "input",
            message: "Please provide manager email:",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "Please provide manager office number:",
            name: "managerOfficeNumber"
        }
        ]

    ).then(function (answers) {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        // const managerHtml = renderManager(manager);
        // console.log(answers);
        // console.log(manager);
        // console.log(managerHtml);
        teamMembers.push(manager);
        questionList();
    });


    function addEngineer() {

        inquirer.prompt(
            [{
                type: "input",
                message: "Please provide engineer's name:",
                name: "engineerName"
            },
            {
                type: "input",
                message: "Please provide engineer's id:",
                name: "engineerId"
            },
            {
                type: "input",
                message: "Please provide engineer's email:",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "Please provide engineer's GitHub username:",
                name: "engineerGithubName"
            }
            ]
        ).then(function (answers) {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithubName);
            teamMembers.push(engineer);
            questionList();
        });
    }

    function addIntern() {

        inquirer.prompt(
            [{
                type: "input",
                message: "Please provide intern name:",
                name: "internName"
            },
            {
                type: "input",
                message: "Please provide intern id:",
                name: "internId"
            },
            {
                type: "input",
                message: "Please provide intern's email:",
                name: "internEmail"
            },
            {
                type: "input",
                message: "Please provide intern's schools name:",
                name: "internSchoolName"
            }
            ]
        ).then(function (answers) {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchoolName);
            teamMembers.push(intern);
            questionList();
        });
    }
}


createManager();

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.

    // HINT: each employee type (manager, engineer, or intern) has slightly different
    // information; write your code to ask different questions via inquirer depending on
    // employee type.

    // HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
    // and Intern classes should all extend from a class named Employee; see the directions
    // for further information. Be sure to test out each class and verify it generates an
    // object with the correct structure and methods. This structure will be crucial in order
    // for the provided `render` function to work! 