import { platform } from 'os';

export async function generatePythonSettings(config) {
  return `{
		"python.pythonPath": ${generateOsVariable(platform, config.envName).path},
		"python.terminal.activateEnvironment": true,
		"python.linting.enabled": true,
		"python.linting.pylintArgs": ["--load-plugins=pylint_${pylintValue(
      options.template,
    )}"],
		"files.autoSave": "onFocusChange",
		"terminal.integrated.env.${
      generateOsVariable(platform, config.envName).name
    }": {
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
}

function generateOsVariable(platform, envName) {
  console.log(platform);
  const os = {
    name: platform,
    path: '',
  };
  if (platform === 'win32') {
    os.name = 'windows';
    os.path = `"\${workspaceFolder}\\${envName}\\bin\\python.exe"`;
  } else if (platform === 'darwin') {
    os.name = 'osx';
    os.path = `"\${workspaceFolder}/${envName}/bin/python"`;
  } else {
    os.platform = 'linux';
    os.path = `"\${workspaceFolder}/${envName}/bin/python"`;
  }
  return os;
}

function pylintValue(value) {
  if (value === 'fsf') {
    return 'django';
  } else return 'flask';
}
