import Listr from 'listr';
import { generateRequirements } from './generate/generateRequirements';
import {
  createENVPy,
  createGitIgnore,
  createHTML,
  createReadme,
  createVSCodeSettings,
} from './tasks/createFiles';
import {
  copyBackendFiles,
  copyCommonFiles,
  copyFrontendFiles,
  copyTemplateFiles,
  createProjectDir,
} from './tasks/createStructure';
import { gitTasks } from './tasks/git';
import { pipOutPut } from './tasks/virtualenv';

export const vsCodeTasks = new Listr([
  {
    title: `Creating ${options.name} Project`,
    task: (ctx, task) => {
      createProjectDir(options).catch(err => {
        if (err.code === 'EEXIST') {
          options.error = true;
          task.skip('Folder Already exists');
          ctx.exists = true;
        } else {
          ctx.exists = false;
        }
      });
    },
    skip: () => options.gitpod,
  },
  {
    title: `Copying Common files to ${options.name}`,
    skip: ctx => ctx.exists,
    task: () => copyCommonFiles(options),
    enabled: () => !options.error,
  },
  {
    title: `Creating Project files for ${options.name}`,
    skip: ctx => ctx.exists,
    task: () =>
      //prettier-ignore
      options.template.python ? copyBackendFiles(options) : copyFrontendFiles(options),
    enabled: () => !options.error,
  },
  {
    title: `Copying Python settings ${options.name}`,
    task: () => copyBackendFiles(options),
    skip: ctx =>
      // prettier-ignore
      ctx.exists || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
    enabled: () => options.template.python && !options.error,
  },
  {
    title: `Copying template files to ${options.name}`,
    task: () => copyTemplateFiles(options),
    enabled: () => !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Making Starting Templates',
    task: () => createHTML(options),
    enabled: () => !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Creating README file',
    task: () => createReadme(options),
    enabled: () => !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Generating requirements.txt file',
    task: () => generateRequirements(options),
    skip: () =>
      // prettier-ignore
      options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
    enabled: () => !options.error,
  },
  {
    title: 'Generating python env file',
    task: () => createENVPy(options),
    skip: () =>
      // prettier-ignore
      options.gitpod || !options.template.flask ? 'Not a Flask Project 🚫🐍' : false,
    enabled: () => options.template.flask && !options.error,
  },
  {
    title: 'Generating vscode settings',
    task: task =>
      createVSCodeSettings(options).catch(err => {
        task.skip(err.message);
      }),
    skip: ctx =>
      // prettier-ignore
      ctx.exists|| options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
    enabled: () => !options.error,
  },
  {
    title: 'Setting up git',
    task: () => gitTasks(options),
    enabled: () => options.git && !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Setting up Virtual Enviroment',
    task: () => pipOutPut(options),
    enabled: () => options.createENV && !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Setting Flask up',
    task: () => pipOutPut(options),
    enabled: () => options.template.flask && !options.error,
    skip: ctx =>
      // prettier-ignore
      ctx.exists || !options.template.flask ? 'Not a Flask Project' : undefined || options.gitpod,
  },
  {
    title: 'Setting Django up',
    task: () => pipOutPut(options),
    enabled: () => options.template.django && !options.error,
    skip: ctx =>
      // prettier-ignore
      ctx.exists || !options.template.django ? 'Not a Django Project' : undefined || options.gitpod,
  },
  {
    title: 'Configuring .gitignore',
    task: () => createGitIgnore(options),
    skip: ctx =>
      // prettier-ignore
      ctx.exists || !options.env ? 'No VirtualEnviroment created' : false || options.gitpod,
    enabled: () => !options.error,
  },
]);
export const gitPodTasks = new Listr([
  {
    title: `Creating ${options.name} Project`,
    task: (ctx, task) => {
      createProjectDir(options).catch(err => {
        if (err.code === 'EEXIST') {
          options.error = true;
          task.skip('Folder Already exists');
          ctx.exists = true;
        } else {
          ctx.exists = false;
        }
      });
    },
    skip: () => options.gitpod,
  },
  {
    title: `Copying Common files to ${options.name}`,
    skip: ctx => ctx.exists,
    task: () => copyCommonFiles(options),
    enabled: () => !options.error,
  },
  {
    title: `Creating Project files for ${options.name}`,
    skip: ctx => ctx.exists,
    task: () =>
      //prettier-ignore
      options.template.python ? copyBackendFiles(options) : copyFrontendFiles(options),
    enabled: () => !options.error,
  },
  {
    title: `Copying Python settings ${options.name}`,
    task: () => copyBackendFiles(options),
    skip: ctx =>
      // prettier-ignore
      ctx.exists || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
    enabled: () => options.template.python && !options.error,
  },
  {
    title: `Copying template files to ${options.name}`,
    task: () => copyTemplateFiles(options),
    enabled: () => !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Making Starting Templates',
    task: () => createHTML(options),
    enabled: () => !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Creating README file',
    task: () => createReadme(options),
    enabled: () => !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Generating requirements.txt file',
    task: () => generateRequirements(options),
    skip: () =>
      // prettier-ignore
      options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
    enabled: () => !options.error,
  },
  {
    title: 'Generating python env file',
    task: () => createENVPy(options),
    skip: () =>
      // prettier-ignore
      options.gitpod || !options.template.flask ? 'Not a Flask Project 🚫🐍' : false,
    enabled: () => options.template.flask && !options.error,
  },
  {
    title: 'Generating vscode settings',
    task: task =>
      createVSCodeSettings(options).catch(err => {
        task.skip(err.message);
      }),
    skip: ctx =>
      // prettier-ignore
      ctx.exists|| options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
    enabled: () => !options.error,
  },
  {
    title: 'Setting up git',
    task: () => gitTasks(options),
    enabled: () => options.git && !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Setting up Virtual Enviroment',
    task: () => pipOutPut(options),
    enabled: () => options.createENV && !options.error,
    skip: ctx => ctx.exists,
  },
  {
    title: 'Setting Flask up',
    task: () => pipOutPut(options),
    enabled: () => options.template.flask && !options.error,
    skip: ctx =>
      // prettier-ignore
      ctx.exists || !options.template.flask ? 'Not a Flask Project' : undefined || options.gitpod,
  },
  {
    title: 'Setting Django up',
    task: () => pipOutPut(options),
    enabled: () => options.template.django && !options.error,
    skip: ctx =>
      // prettier-ignore
      ctx.exists || !options.template.django ? 'Not a Django Project' : undefined || options.gitpod,
  },
  {
    title: 'Configuring .gitignore',
    task: () => createGitIgnore(options),
    skip: ctx =>
      // prettier-ignore
      ctx.exists || !options.env ? 'No VirtualEnviroment created' : false || options.gitpod,
    enabled: () => !options.error,
  },
]);