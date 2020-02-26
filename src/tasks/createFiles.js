import fs from 'fs';
import { promisify } from 'util';
import { generateHTML } from '../generate/generateHTML';
import { generatePythonSettings } from '../generate/generateSettings';
import { generateENVFile } from '../generate/generateENV';
import { generateREADME, generateTESTING } from '../generate/generateMarkdown';

const write = promisify(fs.writeFile);
const append = promisify(fs.appendFile);

export async function createReadme(options) {
  const readmeFile = await generateREADME(options);
  const testFile = await generateTESTING(options);
  await write(options.targetDirectory + '/README.md', readmeFile);
  await write(options.targetDirectory + '/TESTING.md', testFile);
}
export async function createGitIgnore(options) {
  if(!options.envName) return;
  append(options.targetDirectory + '/.gitignore', `\n${options.envName}/`);
}
export async function createProcfile(options) {
  let content = options.template.flask ? `web: python app.py` : `web: gunicorn ${options.name.replace(/[^A-Z0-9]+/gi, '-').toLowerCase()}.wsgi:application`;
  write(options.targetDirectory + '/Procfile', content);
}

export async function createHTML(options) {
  const html = await generateHTML(options);
  let indexFileLocation = '/index.html';
  if (options.template.flask) {
    indexFileLocation = '/templates/pages/index.html';
  }

  await write(options.targetDirectory + indexFileLocation, html);
}

export async function createENVPy(options) {
  await write(options.targetDirectory + '/env.py', generateENVFile(options));
}

export async function createVSCodeSettings(options) {
  let path = '/.vscode/settings.json';
  const settings = await generatePythonSettings(options);
  if (options.gitpod) {
    throw new Error('Gitpod is so far not supported');
  }
  await write(options.targetDirectory + path, settings);
}
