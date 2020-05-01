import execa from 'execa';
import { asyncExec } from 'async-shelljs';
import { getOS } from '../common/common';

const target = {};
let targetDir;
async function activate(options) {
  try {
    await asyncExec(`virtualenv ${targetDir}${target.osVar}`);
    await asyncExec(`${targetDir}${target.pip} install -r ${options.backendDir}${target.requirements} > /dev/null 2>&1`);
    await asyncExec(`${targetDir}${target.pip} freeze --local >> ${options.backendDir}${target.requirements} > /dev/null 2>&1`);
  } catch(error) {
    console.log(error, "Problem in Activate Function")
  }
}

export async function pipOutPut(options) {
  targetDir = options.targetDirectory;
  try {
    const usrOS = await getOS();
    await os(options, usrOS);
    if (!options.gitpod && usrOS === 'windows') {
      await execa('pip install virtualenv');
      await activate(options);
    } else {
      await asyncExec('pip3 install virtualenv > /dev/null 2>&1');
      await activate(options);
    }
    options.env = true;
  } catch (err) {
    console.log("This is a caught error")
  }
}

export async function flaskApp() {
  await asyncExec(`${targetDir}${target.pip} install Flask > /dev/null 2>&1`);
  return;
}

export async function djangoApp() {
  await asyncExec(`${targetDir}${target.pip} install Django > /dev/null 2>&1`);
  return;
}

export async function os(options, platform) {
  console.log(platform);
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
