import simplegit from 'simple-git/promise';
const git = simplegit();

/**
 *  Will execute git init and git add with a commit
 * @param {UserOptions} options
 */
export async function gitTasks(options: UserOptions): Promise<void> {
  try {
    await git.cwd(options.targetDirectory);
    await git.init();
    await git.add('.');
    await git.commit('Initial commit made by The Lazy Padwan');
  } catch (err) {
    console.error(err.message);
  }
  return;
}
