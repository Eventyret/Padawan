import execa from 'execa';
import path from 'path';

const subprocess = execa('python', ['-V']);

const pythonInstall = execa('pip freeze > test.txt');

(async () => {
  const { stdout } = await subprocess;
  console.log(stdout.substr(7));
})();

async function pipOutPut(options) {
  options.targetDirectory = path.resolve(process.cwd());
  const test = await pythonInstall;
  console.log(test);
}
