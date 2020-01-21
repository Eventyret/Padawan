import { platform } from 'os';
const usrPlatform = platform();

export async function getOS() {
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
