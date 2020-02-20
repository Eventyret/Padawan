import arg from 'arg';
import inquirer from 'inquirer';
import clear from 'clear';
import { title } from './common/common';
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
          value: { name: 'FSF', python: true, django: true, flask: false },
        },
      ],
      default: defaultTemplate,
    });
  }
  if (!questions.gitpod) {
    questions.push({
      type: 'confirm',
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
      default: true,
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    name: answers.name,
    env: answers.env || false,
    envName: answers.envName || 'env',
    gitpod: answers.gitpod,
  };
}

async function extraQuestions(options) {
  const questions = [];
  if (options.template.python && !options.gitpod) {
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
  if (!options.env && options.template.python && !options.gitpod) {
    questions.push({
      type: 'confirm',
      name: 'createENV',
      message: 'Do you want us to create one for you?',
      default: true,
    });
  }
  if (options.env && !options.gitpod) {
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
    createENV: answers.createENV,
  };
}

export async function cli(args) {
  clear();
  title('Padawan', 'ANSI Shadow');
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  options = await extraQuestions(options);
  options = await envQuestions(options);
  await createProject(options);
}
