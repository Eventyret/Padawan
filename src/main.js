import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import simplegit from 'simple-git/promise';

const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);
const copy = promisify(ncp);
const append = promisify(fs.appendFile);
const git = simplegit();

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}
async function copyCommonFiles(options) {
  return copy(options.commonDir, options.targetDirectory, {
    clobber: false,
  });
}

async function createProjectDir(options) {
  options.targetDirectory = path.resolve(
    process.cwd(),
    options.name.replace(/\s+/g, '-').toLowerCase(),
  );
  return mkdir(options.targetDirectory);
}

async function initGit(options) {
  await git.cwd(options.targetDirectory);
  await git.init();
  await git.add('.');
  await git.commit('Initial commit made by Padwan Tool');
  return;
}
async function writeReadme(options) {
  append(
    options.commonDir + '/README.md',
    `# Welcome to Project ${options.name} Project`,
  );
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };
  const templateDir = path.resolve(
    __dirname,
    '../templates',
    options.template.toLowerCase(),
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
      title: `Creating ${options.name} Project Structure`,
      task: () => createProjectDir(options),
    },
    {
      title: 'Creating README file',
      task: () => writeReadme(options),
    },
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Copying Common files for the Project',
      task: () => copyCommonFiles(options),
    },
    {
      title: 'Setting up git',
      task: () => initGit(options),
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
    },
  ]);

  await tasks.run();
  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}
