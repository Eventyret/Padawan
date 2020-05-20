import chalk from 'chalk';
import figlet from 'figlet';
import { platform } from 'os';

/**
 * This will return the name of the platform
 * @returns {Promise<String>} - Name of platform
 */
export async function getOS(): Promise<string | undefined> {
  const usrPlatform = platform();
  switch (usrPlatform) {
    case 'win32':
      return 'windows';
    case 'darwin':
      return 'osx';
    case 'linux':
      return 'linux';
    default:
      return;
  }
}

/**
 * Creating custom title
 * @param {String} text - The text to display
 * @param {*} font - The Font used
 */
export async function title({ text, font }: { text: string; font: any; }) {
  console.log(
    chalk.yellow(
      figlet.textSync(text, { horizontalLayout: 'full', font : font ? font :'Big' }),
    ),
  );
}
