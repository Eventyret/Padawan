import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const copy = promisify(ncp);
const read = promisify(fs.readdir);

/**
 * Copies the setup folder per project.
 * @param {Object) options 
 */
export async function copyFiles(options, type) {
  return copy(checkCopyType(type), options.targetDirectory, {
    clobber: false,
  });
}

export async function createProjectDir(options) {
  options.targetDirectory = path.resolve(
    process.cwd(),
    options.name.replace(/[^A-Z0-9]+/gi, '-').toLowerCase(),
  );
  await read(options.targetDirectory);
  return mkdir(options.targetDirectory);
}

function checkCopyType(options, type){
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