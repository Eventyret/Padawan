import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import inquirer from 'inquirer';

const mkdir = promisify(fs.mkdir);
const copy = promisify(ncp);
const read = promisify(fs.readdir);

export async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}
export async function copyCommonFiles(options) {
  return copy(options.commonDir, options.targetDirectory, {
    clobber: false,
  });
}
export async function copyBackendFiles(options) {
  return copy(options.backendDir, options.targetDirectory, {
    clobber: false,
  });
}
export async function copyFrontendFiles(options) {
  return copy(options.frontendDir, options.targetDirectory, {
    clobber: false,
  });
}

export async function createProjectDir(options) {
  options.targetDirectory = path.resolve(
    process.cwd(),
    options.name.replace(/[^A-Z0-9]+/gi, '-').toLowerCase(),
  );
  const existing = await read(options.targetDirectory);
  if (existing.length > 0) {
    return mkdir(options.targetDirectory);
  } else {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `${options.targetDirectory} exists - Do you want to overwrite it?`,
          default: false,
        },
      ])
      .then(answers => {
        console.log(answers);
      });
  }
}
