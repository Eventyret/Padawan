import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const copy = promisify(ncp);

export async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}
export async function copyCommonFiles(options) {
  return copy(options.commonDir, options.targetDirectory, {
    clobber: false,
  });
}
export async function copyBackendFiles(options) {
  return copy(options.backendDir, options.targetDirectory, {
    clobber: false,
  });
}
export async function copyFrontendFiles(options) {
  return copy(options.frontendDir, options.targetDirectory, {
    clobber: false,
  });
}

export async function createProjectDir(options) {
  options.targetDirectory = path.resolve(
    process.cwd(),
    options.name.replace(/\s+/g, '-').toLowerCase(),
  );

  return mkdir(options.targetDirectory);
}
