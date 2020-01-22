import chalk from 'chalk';
import figlet from 'figlet';
import { platform } from 'os';

export async function getOS() {
  const usrPlatform = platform();
  switch (usrPlatform) {
    case 'win32':
      return 'windows';
    case 'darwin':
      return 'osx';
    case 'linux':
      return 'linux';
    default:
      return false;
  }
}

export function title(text) {
  console.log(
    chalk.yellow(
      figlet.textSync(text, { horizontalLayout: 'full', font: 'Big' }),
    ),
  );
}