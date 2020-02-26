import simplegit from 'simple-git/promise';
const git = simplegit();

export async function gitTasks(options) {
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
