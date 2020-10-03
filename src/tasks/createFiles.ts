import fs from 'fs';
import { promisify } from 'util';
import { generateHTML } from '../generate/generateHTML';
import { generatePythonSettings } from '../generate/generateSettings';
import { generateENVFile } from '../generate/generateENV';
import { generateREADME, generateTESTING } from '../generate/generateMarkdown';

const write = promisify(fs.writeFile);
const append = promisify(fs.appendFile);

/**
 * Generates README and Markdown files
 * @param {UserOptions} options
 */
export async function createMarkdown(options: UserOptions) {
  const readmeFile = await generateREADME(options);
  const testFile = await generateTESTING();
  await write(options.targetDirectory + '/README.md', readmeFile);
  await write(options.targetDirectory + '/TESTING.md', testFile);
}

/**
 * Generates a custom .gitignore file depending on project
 * @param {UserOptions} options
 */
export async function createGitIgnore(options: UserOptions) {
  if (!options.envName) return;
  append(options.targetDirectory + '/.gitignore', `\n${options.envName}/`);
}
/**
 * Generates a custom Procfile depending on project
 * @param {UserOptions} options
 */
export async function createProcfile(options: UserOptions) {
  const content = options.template.flask ? `web: python app.py` : `web: gunicorn ${options.name.replace(/[^A-Z0-9]+/gi, '-').toLowerCase()}.wsgi:application`;
  await append(options.targetDirectory + '/Procfile', content);
}

/**
 * Generates HTML for projects
 * @param {UserOptions} options
 */
export async function createHTML(options: UserOptions) {
  const html = await generateHTML(options);
  if (options.template.flask || options.template.django) return;
  const indexFileLocation = '/index.html';
  await write(options.targetDirectory + indexFileLocation, html);
}

/**
 * Generates env.py used for python projects
 * @param {UserOptions} options
 */
export async function createENVPy(options: UserOptions) {
  await write(options.targetDirectory + '/env.py', await generateENVFile(options));
}

/**
 *  Generates vscode settings per project.
 * @param {UserOptions} options
 */
export async function createVSCodeSettings(options: UserOptions) {
  const path = '/.vscode/settings.json';
  const settings = await generatePythonSettings(options);
  if (options.gitpod) {
    throw new Error('Gitpod is so far not supported');
  }
  await write(options.targetDirectory + path, settings);
}
