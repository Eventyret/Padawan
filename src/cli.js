import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--skip': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2),
    },
  );
  return {
    skipPrompts: args['--skip'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
  };
}
async function promptForMissingOptions(options) {
  const defaultTemplate = 'ms1';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
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
  console.log(options);
}
