import { getOS } from '../common/common';
import { platform } from 'os';
const usrPlatform = platform();

// TODO No need for workspace can be env\

export async function generatePythonSettings(config) {
  const envPath = config.env ? await generatePath(config) : '';
  const usrOS = await getOS();
  const settings = `{
  ${envPath}
  "python.terminal.activateEnvironment": true,
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.linting.pylintArgs": ["--load-plugins=pylint_${
    config.template.django ? 'django' : 'flask'
  }"],
  "files.autoSave": "onFocusChange",
  "terminal.integrated.env.${usrOS}": {
    "SECRET_KEY": "${Math.random()
      .toString(36)
      .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)}",
      "DEV": "1",
      "FLASK_DEBUG": "1",
      "MONGO_URI": "YOUR MONGO URI GOES HERE"
    }
  }`;
  return settings;
}

async function generatePath(config) {
  if (usrPlatform === 'darwin' || usrPlatform === 'linux')
    return `"python.pythonPath:\${workspaceFolder}/${config.envName}/bin/python",`;
  if (usrPlatform === 'win32')
    return `"python.pythonPath": "\${workspaceFolder}\\\\${config.envName}\\\\Scripts\\\\python.exe",`;
}
