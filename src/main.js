import chalk from 'chalk';
import clear from 'clear';
import fs from 'fs';
import Listr from 'listr';
import path from 'path';
import rimraf from 'rimraf';
import { promisify } from 'util';
import { title } from './common/common';
import { generateRequirements } from './generate/generateRequirements';
import {
  createENVPy,
  createGitIgnore,
  createHTML,
  createReadme,
  createVSCodeSettings,
} from './tasks/createFiles';
import {
  copyBackendFiles,
  copyCommonFiles,
  copyFrontendFiles,
  copyTemplateFiles,
  createProjectDir,
} from './tasks/createStructure';
import { gitTasks } from './tasks/git';
import { pipOutPut } from './tasks/virtualenv';

const access = promisify(fs.access);
const rm = promisify(rimraf);
let errorToggle = false;
export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const templateDir = path.resolve(
    __dirname,
    '../templates',
    options.template.name.toLowerCase(),
  );

  const commonDir = path.resolve(__dirname, '../templates/common');
  const backendDir = path.resolve(__dirname, '../templates/backend');
  const frontendDir = path.resolve(__dirname, '../templates/frontend');
  options.templateDirectory = templateDir;
  options.commonDir = commonDir;
  options.backendDir = backendDir;
  options.frontendDir = frontendDir;

  try {
    await access(templateDir, fs.constants.R_OK);
    await access(commonDir, fs.constants.R_OK);
    await access(backendDir, fs.constants.R_OK);
    await access(frontendDir, fs.constants.R_OK);
  } catch (err) {
    console.log(err);
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: `Creating ${options.name} Project`,
      task: (ctx, task) => {
        createProjectDir(options).catch(err => {
          console.log('catch in ctx');
          console.log(err);
          if (err.code === 'EEXIST') {
            options.error = true;
            task.skip('Folder Already exists');
            ctx.exists = true;
          } else {
            ctx.exists = false;
          }
        });
      },
      skip: () => options.gitpod,
    },
    {
      title: `Copying Common files to ${options.name}`,
      skip: ctx => ctx.exists || options.gitpod,
      task: () => copyCommonFiles(options),
      enabled: () => !options.gitpod || !options.error,
    },
    {
      title: `Creating Project files for ${options.name}`,
      skip: ctx => ctx.exists || options.gitpod,
      task: () =>
        //prettier-ignore
        options.template.python ? copyBackendFiles(options) : copyFrontendFiles(options),
      enabled: () => !options.error,
    },
    {
      title: `Copying Python settings ${options.name}`,
      task: () => copyBackendFiles(options),
      skip: ctx =>
        // prettier-ignore
        ctx.exists || options.gitpod|| !options.template.python ? 'Not a Python Project 🚫🐍' : false,
      enabled: () =>
        !options.gitpod || (options.template.python && !options.error),
    },
    {
      title: `Copying template files to ${options.name}`,
      task: () => copyTemplateFiles(options),
      enabled: () => !options.gitpod || !options.error,
      skip: ctx => ctx.exists || options.gitpod,
    },
    {
      title: 'Making Starting Templates',
      task: () => createHTML(options),
      enabled: () => !options.gitpod || !options.error,
      skip: ctx => ctx.exists || options.gitpod,
    },
    {
      title: 'Creating README file',
      task: () => createReadme(options),
      enabled: () => !options.gitpod || !options.error,
      skip: ctx => ctx.exists || options.gitpod,
    },
    {
      title: 'Generating requirements.txt file',
      task: () => generateRequirements(options),
      skip: () =>
        // prettier-ignore
        options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
      enabled: () => !options.gitpod || !options.error,
    },
    {
      title: 'Generating python env file',
      task: () => createENVPy(options),
      skip: () =>
        // prettier-ignore
        options.gitpod || !options.template.flask ? 'Not a Flask Project 🚫🐍' : false,
      enabled: () =>
        !options.gitpod || (options.template.flask && !options.error),
    },
    {
      title: 'Generating vscode settings',
      task: task =>
        createVSCodeSettings(options).catch(err => {
          task.skip(err.message);
        }),
      skip: ctx =>
        // prettier-ignore
        ctx.exists|| options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
      enabled: () => !options.gitpod || !options.error,
    },
    {
      title: 'Setting up git',
      task: () => gitTasks(options),
      enabled: () => !options.gitpod || (options.git && !options.error),
      skip: ctx => ctx.exists || options.gitpod,
    },
    {
      title: 'Setting up Virtual Enviroment',
      task: () => pipOutPut(options),
      enabled: () => !options.gitpod || (options.createENV && !options.error),
      skip: ctx => ctx.exists || options.gitpod || options.gitpod,
    },
    {
      title: 'Setting Flask up',
      task: () => pipOutPut(options),
      enabled: () =>
        !options.gitpod || (options.template.flask && !options.error),
      skip: ctx =>
        // prettier-ignore
        ctx.exists || options.gitpod || !options.template.flask ? 'Not a Flask Project' : undefined,
    },
    {
      title: 'Setting Django up',
      task: () => pipOutPut(options),
      enabled: () =>
        !options.gitpod || (options.template.django && !options.error),
      skip: ctx =>
        // prettier-ignore
        ctx.exists || options.gitpod ||!options.template.django ? 'Not a Django Project' : undefined,
    },
    {
      title: 'Configuring .gitignore',
      task: () => createGitIgnore(options),
      skip: ctx =>
        // prettier-ignore
        ctx.exists || !options.env ? 'No VirtualEnviroment created' : false,
      enabled: () => !options.gitpod || !options.error,
    },
  ]);

  await tasks.run().catch(() => (errorToggle = true));
  if (!errorToggle && !options.error && !options.gitpod) {
    title(`Created
    ${options.name}`);
    console.log('Tool created by Eventyret_Mentor ❤');
    console.log(
      'If you liked this tool please do say thank you in Slack or mention the tool in your ReadmeI',
    );
    return true;
  }
  if (options.gitpod) {
    clear();
    title('Oh noes!');
    console.log('Gitpod is not supported yet');
    return false;
  }
  if (options.error) {
    clear();
    title('Error');
    console.log(`${options.name} folder already exists`);
    return false;
  }
}
