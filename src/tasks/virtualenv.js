import { asyncExec } from 'async-shelljs';
import { getOS } from '../common/common';

const target = {};
let targetDir;
async function activate(options) {
  try {
    const devNul = await getDevNul();
    await asyncExec(`virtualenv ${targetDir}${target.osVar}`);
    await asyncExec(`${targetDir}${target.pip} install -r ${options.backendDir}${target.requirements} > ${devNul}`);
    await asyncExec(`${targetDir}${target.pip} freeze --local >> ${options.backendDir}${target.requirements} > ${devNul}`);
  } catch (err) {
    throw err;
  }
}

export async function pipOutPut(options) {
  targetDir = options.targetDirectory;
  try {
    const usrOS = await getOS();
    await os(options, usrOS);
    if (!options.gitpod && usrOS === 'windows') {
      await asyncExec('pip install virtualenv');
      await activate(options);
    } else {
      await asyncExec('pip3 install virtualenv > /dev/null 2>&1');
      await activate(options);
    }
    options.env = true;
  } catch (err) {
  }
}

export async function flaskApp() {
  const devNul = await getDevNul();
  await asyncExec(`${targetDir}${target.pip} install Flask > ${devNul}`);
  return;
}

export async function djangoApp() {
  const devNul = await getDevNul();
  await asyncExec(`${targetDir}${target.pip} install Django > ${devNul}`);
  return;
}

async function getDevNul() {
  return (await getOS()) === 'windows' ? 'NUL' : '/dev/null 2>&1';
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
    target.pythonExecutable = `/${envName}/bin/python3`;
    target.pip = `/${envName}/bin/pip3`;
    target.requirements = '/requirements.txt';
  }
}
