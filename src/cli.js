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
      '--clean': Boolean,
      '-n': '--name',
      '-g': '--git',
      '-s': '--skip',
      '-i': '--install',
      '-c': '--clean',
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
    clean: args['--clean'] || false,
  };
}
async function promptForMissingOptions(options) {
  const defaultTemplate = 'UCFD';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
      clean: options.template || false,
    };
  }
  const questions = [];
  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'What is the name of this amazing project: ',
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

async function extraQuestions(options) {
  const questions = [];
  if (options.template == 'FSF' || options.template == 'DCD') {
    questions.push({
      type: 'confirm',
      name: 'env',
      message: 'Have you created a virtual enviroment for your project',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    env: answers.env,
    pyton: true
  };
}
async function envQuestions(options) {
  const questions = [];
  if (options.env) {
    questions.push({
      type: 'input',
      name: 'envName',
      message: 'What is the name of the folder for your virtual enviroment',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'We need to know your virtual enviroment folder name';
        }
      },
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    envName: answers.envName,
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
  options = await extraQuestions(options);
  options = await envQuestions(options);
  await createProject(options);
  console.log(options);
}
