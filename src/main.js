import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import path from 'path';
import { projectInstall } from 'pkg-install';
import { promisify } from 'util';
import {
  createProjectDir,
  copyTemplateFiles,
  copyCommonFiles,
} from './tasks/createStructure';
import {
  createReadme,
  createGitIgnore,
  createHTML,
  createVSCodeSettings,
} from './tasks/createFiles';
import { gitTasks } from './tasks/git';
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
  options.templateDirectory = templateDir;
  options.commonDir = commonDir;

  try {
    await access(templateDir, fs.constants.R_OK);
    await access(commonDir, fs.constants.R_OK);
  } catch (err) {
    console.log(err);
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: `Creating ${options.name} Project`,
      task: () => createProjectDir(options),
      enabled: true,
    },
    {
      title: `Copying Common files to ${options.name}`,
      task: () => copyCommonFiles(options),
      enabled: true,
    },
    {
      title: `Copying template files to ${options.name}`,
      task: () => copyTemplateFiles(options),
      enabled: true,
    },
    {
      title: 'Making Starting Templates',
      task: () => createHTML(options),
      enabled: true,
    },
    {
      title: 'Creating README file',
      task: () => createReadme(options),
      enabled: true,
    },
    {
      title: 'Customizing git ignore file',
      task: () => createGitIgnore(options),
      enabled: true,
      skip: () =>
        // prettier-ignore
        !options.env ? 'No virtual enviroment created' : false,
    },
    {
      title: 'Generating vscode settings',
      task: () => createVSCodeSettings(options),
      skip: () =>
        // prettier-ignore
        !options.template.python ? 'Not a Python Project' : false,
      enabled: true,
    },
    {
      title: 'Setting up git',
      task: () => gitTasks(options),
      enabled: () => options.git,
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
      enabled: false,
    },
  ]);

  await tasks.run();
  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}
