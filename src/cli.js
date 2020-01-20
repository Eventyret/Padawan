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
      '--gitpod': Boolean,
      '-n': '--name',
      '-g': '--git',
      '-p': '--gitpod',
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
    gitpod: args['--gitpod'] || false,
  };
}
async function promptForMissingOptions(options) {
  const defaultTemplate = 'UCFD';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template.name || defaultTemplate,
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
          value: { name: 'UCFD', python: false, django: false, flask: false },
        },
        {
          name: 'Interactive Frontend (MS2)',
          value: { name: 'IFD', python: false, django: false, flask: false },
        },
        {
          name: 'Data Centric Development (MS3)',
          value: { name: 'DCD', python: true, django: false, flask: true },
        },
        {
          name: 'Full Stack Frameworks (MS4)',
          value: { name: 'FSF', python: true, django: false, flask: true },
        },
      ],
      default: defaultTemplate,
    });
  }
  if (!questions.gitpod) {
    questions.push({
      type: 'configm',
      name: 'gitpod',
      message: 'Are you using Gitpod?',
      default: false,
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
    env: answers.env || false,
    envName: answers.envName || '',
    gitpod: answers.gitpod,
  };
}

async function extraQuestions(options) {
  const questions = [];
  if (options.template.python) {
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
