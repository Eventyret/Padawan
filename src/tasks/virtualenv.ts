import { asyncExec } from 'async-shelljs';
import { getOS } from '../common/common';

const target: PythonSettings = {};
let targetDir: string | undefined;

/**
 * Using virtualenv to freeze and install correct pip packages
 * @param {UserOptions} options
 */
async function pipInstallAndFreeze(options: UserOptions) {
  try {
    const devNul = await getDevNul();
    await asyncExec(`virtualenv ${targetDir}${target.osVar}`);
    await asyncExec(`${targetDir}${target.pip} install -r ${options.backendDir}${target.requirements} > ${devNul}`);
    await asyncExec(`${targetDir}${target.pip} freeze --local >> ${options.backendDir}${target.requirements} > ${devNul}`);
  } catch (err) {
    throw err;
  }
}

// TODO: Check if python3 is installed
/**
 * Installing and using virtualenv
 * @param {UserOptions} options
 */
export async function installVirtualEnv(options: UserOptions) {
  targetDir = options.targetDirectory;
  try {
    const usrOS = await getOS();
    await targetOS(options, usrOS);
    if (!options.gitpod && usrOS === 'windows') {
      await asyncExec('pip install virtualenv');
      await pipInstallAndFreeze(options);
    } else {
      await asyncExec('pip3 install virtualenv > /dev/null 2>&1');
      await pipInstallAndFreeze(options);
    }
    options.env = true;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Install Flask into the virtual environment
 */
export async function flaskApp() {
  const devNul = await getDevNul();
  await asyncExec(`${targetDir}${target.pip} install Flask > ${devNul}`);
  return;
}

/**
 * Installs Django into the virtual environment
 */
export async function djangoApp() {
  const devNul = await getDevNul();
  await asyncExec(`${targetDir}${target.pip} install Django > ${devNul}`);
  return;
}

/**
 * Checks if we want to use dev/null or Nul
 * @returns {Promise<String>} Nul or dev/null
 */
async function getDevNul(): Promise<string> {
  return (await getOS()) === 'windows' ? 'NUL' : '/dev/null 2>&1';
}

/**
 * Sets up the correct targets for use depending on OS
 * @param {UserOptions} options
 * @param {String} platform
 */
async function targetOS(options: UserOptions, platform: string) {
  const envName = !options.envName ? 'env' : options.envName;
  if (platform === 'windows') {
    // prettier-ignore
    target.path = `\\\\${envName}\\Scripts\\activate`;
    target.osVar = `\\\\${envName}`;
    target.pythonExecutable = `\\\\${envName}\\Scripts\\python.exe`;
    target.pip = `\\\\${envName}\\Scripts\\pip.exe`;
    target.requirements = '\\requirements.txt';
  } else {
    target.path = `/${envName}/bin/activate`;
    target.osVar = `/${envName}`;
    target.pythonExecutable = `/${envName}/bin/python3`;
    target.pip = `/${envName}/bin/pip3`;
    target.requirements = '/requirements.txt';
  }
}
