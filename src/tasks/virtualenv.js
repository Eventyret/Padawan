import execa from 'execa';
import { getOS } from '../common/common';

const target = {};
let targetDir;
async function activate(options) {
  await execa(`virtualenv ${targetDir}${target.osVar}`);
  await execa(`${targetDir}${target.pip}`, [
    `install`,
    `-r`,
    `${options.backendDir}${target.requirements}`,
  ]);
  await execa(`${targetDir}${target.pip}`, [
    'freeze',
    '--local',
    '>>',
    `${targetDir}${target.requirements}`,
  ]);
}

export async function pipOutPut(options) {
  targetDir = options.targetDirectory;
  try {
    const usrOS = await getOS();
    await os(options, usrOS);
    if (!options.gitpod && usrOS === "windows") {
      await execa('pip install virtualenv');
      await activate(options);
    }
    options.env = true;
  } catch (err) {
    throw err;
  }
}

export async function flaskApp() {
  await execa(`${targetDir}${target.pip}`, ['install', 'Flask']);
  return;
}

export async function djangoApp() {
  await execa(`${targetDir}${target.pip}`, ['install', 'Django']);
  return;
}

export async function os(options, platform) {
  let envName = !options.envName ? 'env' : options.envName;
  if (platform == 'windows') {
    //prettier-ignore
    target.path = `\\\\${envName}\\Scripts\\activate`;
    target.osVar = `\\\\${envName}`;
    target.pythonExecutable = `\\\\${envName}\\Scripts\\python.exe`;
    target.pip = `\\\\${envName}\\Scripts\\pip.exe`;
    target.requirements = '\\requirements.txt';
  } else {
    target.path = `/${envName}/bin/activate`;
    target.osVar = `/${envName}`;
    target.pythonExecutable = `${envName}/bin/python`;
    target.pip = `${envName}/bin/pip`;
    target.requirements = '/requirements.txt';
  }
}
