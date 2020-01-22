import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import path from 'path';
import { projectInstall } from 'pkg-install';
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
      task: () => createProjectDir(options),
    },
    {
      title: `Copying Common files to ${options.name}`,
      task: () => copyCommonFiles(options),
    },
    {
      title: `Creating Project files for ${options.name}`,
      task: () =>
        //prettier-ignore
        options.template.python ? copyBackendFiles(options) : copyFrontendFiles(options),
    },
    {
      title: `Copying Python settings ${options.name}`,
      task: () => copyBackendFiles(options),
      skip: () =>
        // prettier-ignore
        !options.template.python ? 'Not a Python Project 🚫🐍' : false,
    },
    {
      title: `Copying template files to ${options.name}`,
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Making Starting Templates',
      task: () => createHTML(options),
    },
    {
      title: 'Creating README file',
      task: () => createReadme(options),
    },
    {
      title: 'Customizing git ignore file',
      task: () => createGitIgnore(options),
      skip: () =>
        // prettier-ignore
        !options.env ? 'No virtual enviroment created' : false,
    },
    {
      title: 'Generating requirements.txt file',
      task: () => generateRequirements(options),
      skip: () =>
        // prettier-ignore
        !options.template.python ? 'Not a Python Project 🚫🐍' : false,
    },
    {
      title: 'Generating python env file',
      task: () => createENVPy(options),
      skip: () =>
        // prettier-ignore
        !options.template.flask ? 'Not a Flask Project 🚫🐍' : false,
    },
    {
      title: 'Generating vscode settings',
      task: (ctx, task) =>
        createVSCodeSettings(options).catch(err => {
          ctx.gitpod = false;
          task.skip(err.message);
        }),
      skip: () =>
        // prettier-ignore
        !options.template.python ? 'Not a Python Project 🚫🐍' : false,
    },
    {
      title: 'Setting up git',
      task: () => gitTasks(options),
      enabled: () => options.git,
    },
    {
      title: 'Setting up Virtual Enviroment',
      task: () => pipOutPut(options),
      enabled: () => options.createENV,
    },
    {
      title: 'Setting Flask up',
      task: () => pipOutPut(options),
      enabled: () => options.template.flask,
      skip: () => !options.template.flask ? 'Not a Flask Project' : undefined,
    },
    {
      title: 'Setting Django up',
      task: () => pipOutPut(options),
      enabled: () => options.template.django,
      skip: () => !options.template.django ? 'Not a Django Project' : undefined,
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        // prettier-ignore
        !options.runInstall ? 'Pass --install to automatically install dependencies' : undefined,
    },
  ]);

  await tasks.run().catch(err => {
    console.error(err);
  });
  title(`Created
${options.name}`);
  return true;
}
