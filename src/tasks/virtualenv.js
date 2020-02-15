import execa from 'execa';
import { platform } from 'os';

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
    await os(options);
    if (!options.gitpod) {
      await execa('pip install virtualenv');
      await activate(options);
    }
    options.env = true;
    if (options.template.flask) {
      await flaskApp();
    } else {
      await djangoApp();
    }
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

export async function os(options) {
  if (platform() == 'win32') {
    let envName = !options.envName ? 'env' : options.envName;
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
