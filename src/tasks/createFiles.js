import fs from 'fs';
import { promisify } from 'util';
import { generateHTML } from '../generate/generateHTML';
import { generatePythonSettings } from '../generate/generateSettings';

const write = promisify(fs.writeFile);
const append = promisify(fs.appendFile);

export async function createReadme(options) {
  write(
    options.targetDirectory + '/README.md',
    `# Welcome to Project ${options.name} Project`,
  );
}
export async function createGitIgnore(options) {
  append(options.targetDirectory + '/.gitignore', `\n${options.envName}/`);
}

export async function createHTML(options) {
  const html = await generateHTML(options);
  let indexFileLocation = '/index.html';
  if (options.template.flask) {
    indexFileLocation = '/templates/index.html';
  }

  await write(options.targetDirectory + indexFileLocation, html);
}

export async function createVSCodeSettings(options) {
  let path = '/.vscode/settings.json';
  const settings = await generatePythonSettings(options);
  if (options.gitpod) {
    throw new Error('Gitpod is so far not supported');
  }
  await write(options.targetDirectory + '/.vscode/settings.json', settings);
}
