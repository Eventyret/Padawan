import chalk from 'chalk';
import clear from 'clear';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { title } from './common/common';

import { vsCodeTasks, gitPodTasks } from './tasks/queue';
const access = promisify(fs.access);
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

  if (!options.gitpod) {
    await vsCodeTasks.run().catch(() => (errorToggle = true));
    if (!errorToggle && !options.error) {
      title(`Created
      ${options.name}`);
      console.log('Tool created by Eventyret_Mentor ❤');
      console.log(
        'If you liked this tool please do say thank you in Slack or mention the tool in your ReadmeI',
      );
      return true;
    }
    if (options.error) {
      clear();
      title('Error');
      console.log(`${options.name} folder already exists`);
      return false;
    }
  } else {
    clear();
    title('Oh noes!');
    console.log('Gitpod is not supported yet');
    return false;
  }
}
