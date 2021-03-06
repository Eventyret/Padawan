import fs from 'fs';
import { promisify } from 'util';

const append = promisify(fs.appendFile);

/**
 * Generates the requirements.txt for Milestone 3 or Milestone 4
 * @param {UserOptions} options
 */
export async function generateRequirements(options: UserOptions) {
  // prettier-ignore
  const requirements = options.template.flask ? 'Flask\npymongo\npylint_flask' : 'Django\npylint_django';
  await append(
    options.targetDirectory + '/requirements.txt',
    `\n${requirements}`,
  );
}
