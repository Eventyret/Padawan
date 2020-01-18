import { platform } from 'os';
export async function generatePythonSettings(config) {
  return `{
		"python.pythonPath": ${generateOsVariable(platform)},
		"python.terminal.activateEnvironment": true,
		"python.linting.enabled": true,
		"python.linting.pylintArgs": ["--load-plugins=pylint_${pylintValue(
      options.template,
    )}"],
		"files.autoSave": "onFocusChange",
		"terminal.integrated.env.osx": {
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

function generateOsVariable(os) {
  console.log(os);
  switch (os) {
    case 'win32':
      return `"\${workspaceFolder}\\${config.envName}\\bin\\python.exe"`;
    case 'dawin':
      return `"\${workspaceFolder}/${config.envName}/bin/python"`;
    case 'linux':
      return `"\${workspaceFolder}/${config.envName}/bin/python"`;
  }
}

function pylintValue(value) {
  if (value === 'fsf') {
    return 'django';
  } else return 'flask';
}
