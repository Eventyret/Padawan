import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--name': String,
      '--skip': Boolean,
      '--git': Boolean,
      '--install': Boolean,
      '-n': '--name',
      '-g': '--git',
      '-s': '--skip',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2),
    },
  );
  return {
    name: args['--name'],
    skipPrompts: args['--skip'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
  };
}
async function promptForMissingOptions(options) {
  const defaultTemplate = 'UCFD';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }
  const questions = [];
  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'What shall we call this awesome project',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Need to give your project a name';
        }
      },
    });
  }
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'What milestone will you be working on?',
      choices: [
        {
          name: 'User Centric Frontend (MS1)',
          value: 'UCFD',
        },
        {
          name: 'Interactive Frontend (MS2)',
          value: 'IFD',
        },
        {
          name: 'Data Centric Development (MS3)',
          value: 'DCD',
        },
        {
          name: 'Full Stack Frameworks (MS4)',
          value: 'FSF',
        },
      ],
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    name: answers.name,
  };
}

function title() {
  console.log(
    chalk.yellow(
      figlet.textSync('Padawan', { horizontalLayout: 'full', font: 'Big' }),
    ),
  );
}

export async function cli(args) {
  clear();
  title();
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
  // console.log(options);
}
