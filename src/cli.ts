import arg from 'arg';
import inquirer from 'inquirer';
import clear from 'clear';
import { title } from './common/common';
import { createProject } from './main';

/**
 *  Input taken directly from the user
 * @param {String[]} rawArgs
 */
async function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {
      '--name': String,
      '--git': Boolean,
      '--gitpod': Boolean,
      '-n': '--name',
      '-g': '--git',
      '-p': '--gitpod',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    name: args['--name'],
    git: args['--git'] || false,
    template: args._[0],
    gitpod: args['--gitpod'] || false,
  };
}
/**
 *
 * @param {UserOptions} options
 */
async function promptForMissingOptions(options: UserOptions): Promise<UserOptions> {
  const defaultTemplate = 'UCFD';
  const questions:Questions[] = [];
  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'What is the name of this amazing project: ',
      validate(value: any) {
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
          value: { name: 'frontend', python: false, django: false, flask: false, js: false },
        },
        {
          name: 'Interactive Frontend (MS2)',
          value: { name: 'frontend', python: false, django: false, flask: false, js: true },
        },
        {
          name: 'Data Centric Development (MS3)',
          value: { name: 'DCD', python: true, django: false, flask: true, js: true },
        },
        {
          name: 'Full Stack Frameworks (MS4)',
          value: { name: 'FSF', python: true, django: true, flask: false, js: true },
        },
      ],
      default: defaultTemplate,
    });
  }
  // @ts-ignore
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
/**
 * Checking if the user has created a virtual enviroment before
 * @param {UserOptions} options
 */
async function doesEnvExistForProject(options: UserOptions) {
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
/**
 *  Questions if the user wants us to create a virtual enviroment
 * or if the user has one already what is the name of the folder.
 * @param {UserOptions} options
 */
async function envQuestions(options: UserOptions) {
  const questions: Questions[] = [];
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
      validate(value:any) {
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

/**
 * Starting the main program
 * @param {any} args
 */
export async function cli(args: any[]) {
  clear();
  title({ text: 'Padawan', font: 'ANSI Shadow' });
  let options: any = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  options = await doesEnvExistForProject(options);
  options = await envQuestions(options);
  await createProject(options);
}
