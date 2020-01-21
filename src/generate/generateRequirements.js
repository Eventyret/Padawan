import fs from 'fs';
import { promisify } from 'util';

const write = promisify(fs.createWriteStream);

export async function generateRequirements(options) {
const requirements = ['pylint', 'pep8', 'autopep8', ''];
let file =write('array.txt');
file.on('error', function(err) { /* error handling */ });
requirements.forEach(function(v) { file.write(v.join(', ') + '\n'); });
file.end();
  if (options.template.flask) {
    requirements.push('Flask', 'pymongo');
  } else {
    requirements.push('Django');
  }
  // await write(options.targetDirectory + '/requirements.txt', requirements);
}
