import { platform } from 'os';
const userOS = getOS();
export async function generatePythonSettings(config) {
  const envPath = config.env ? generatePath(config) : '';
  const settings = `{
  ${envPath}
  "python.terminal.activateEnvironment": true,
  "python.linting.enabled": true,
  "python.linting.pylintArgs": ["--load-plugins=pylint_${
    config.template.django ? 'django' : 'flask'
  }"],
  "files.autoSave": "onFocusChange",
  "terminal.integrated.env.${userOS}": {
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

function generatePath(config) {
  if (platform() === 'darwin' || platform() === 'linux')
    return `"python.pythonPath:\${workspaceFolder}/${config.envName}/bin/python",`;
  if (platform() === 'windows')
    return `"python.pythonPath": "\${workspaceFolder}\\\\${config.envName}\\\\bin\\\\python.exe",`;
}
function getOS() {
  switch (platform()) {
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
