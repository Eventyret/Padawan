import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const copy = promisify(ncp);
const read = promisify(fs.readdir);

/**
 * Copies the setup folder per project.
 * @param {UserOptions) options
 */
export async function copyFiles(options: UserOptions, type) {
  await copy(checkCopyType(options, type), options.targetDirectory, {
    clobber: false,
  });
}

/**
 * Creates the main Project directory.
 * @param {Object} options
 * @returns {Promise} Target Directory if created
 */
export async function createProjectDir(options) {
  options.targetDirectory = path.resolve(
    process.cwd(),
    options.name.replace(/[^A-Z0-9]+/gi, '-').toLowerCase(),
  );
  await read(options.targetDirectory);
  return mkdir(options.targetDirectory);
}

/**
 *  Checks what folder to copy
 * @param {UserOptions} options
 * @param {String} type - Name of the folder
 */
function checkCopyType(options: UserOptions, type){
  switch (type) {
    case "templates":
      return  options.templateDirectory
    case "common":
    return options.commonDir
    case "backend":
    return options.backendDir
    case "frontend":
    return options.frontendDir

    default:
      return null
  }
}