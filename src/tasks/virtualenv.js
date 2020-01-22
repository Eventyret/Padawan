import execa from 'execa';
import { platform } from 'os';

async function activate(options) {
  const targetDir = options.targetDirectory;
  let path;
  let osVar;
  let pythonExecutable;
  let pip;
  let requirements;
  if (platform() == 'win32') {
    //prettier-ignore
    path = `\\env\\Scripts\\activate`;
    osVar = '\\env';
    pythonExecutable = '\\env\\Scripts\\python.exe';
    pip = '\\env\\Scripts\\pip.exe';
    requirements = '\\requirements.txt';
  } else {
    path = `/env/bin/activate`;
    osVar = '/env';
    pythonExecutable = 'env/bin/python';
    pip = 'env/bin/pip';
    requirements = '/requirements.txt';
  }
  await execa(`virtualenv ${targetDir}${osVar}`);
  console.log(`${targetDir}${requirements}`);
  await execa(`${targetDir}${pip}`, [
    `install`,
    `-r`,
    `${options.pythonDir}${requirements}`,
  ]);
  await execa(`${targetDir}${pip}`, [
    'freeze',
    '>>',
    `${targetDir}${requirements}`,
  ]);
}

export async function pipOutPut(options) {
  try {
    await execa('pip install virtualenv');
    const test = await activate(options);
    console.log(test);
  } catch (err) {
    throw err;
  }
}
