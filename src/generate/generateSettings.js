import { getOS } from '../common/common';

/**
 * Generates python specific vscode settings.
 * This includes a secret key and linting
 * @param {Object} config
 * @returns Customized vscode settings per OS.
 */
export async function generatePythonSettings(config) {
  const usrOS = await getOS();
  // prettier-ignore
  const envPath =
    (config.env || config.createENV) ? await generatePath(config, usrOS) : '';
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
      "HOSTNAME": "0.0.0.0",
      ${config.template.flask ? await flaskSettings() : await djangoSettings()}
    }
  }`;
  return settings;
}

/**
 * Generates correct path for virtual enviroment
 * @param {Object} config 
 * @param {String} os 
 * @returns {Promise<String>} Customized OS path for virutal enviroment
 */
async function generatePath(config, os) {
  const envName = config.envName ? config.envName : 'env';
  if (os === 'osx' || os === 'linux')
    return `"python.pythonPath": "${envName}/bin/python3",`;
  if (os === 'windows')
    return `"python.pythonPath": "${envName}\\\\Scripts\\\\python.exe",`;
}

/**
 * Flask specific settings
 * @returns {Promise<String>} Mongo URI Settings
 */
async function flaskSettings() {
  return `"MONGO_URI": "YOUR MONGO URI GOES HERE"`;
}

/**
 * Django specific settings
 * @returns {Pormise<String>} Stripe & AWS Settings
 */
async function djangoSettings() {
  return `"STRIPE_PUBLISHABLE": "",
  "STRIPE_SECRET": "",
  "AWS_ACCESS_KEY_ID": "",
  "AWS_SECRET_ACCESS_KEY: "",
  "AWS_STORAGE_BUCKET_NAME": ""`;
}
