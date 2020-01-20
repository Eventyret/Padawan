const execa = require('execa');

const subprocess = execa('python', ['-V']);
const pythonInstall = execa('pip uninstall Flask',['--y']);

(async () => {
  const { stdout } = await subprocess;
  console.log(stdout.substr(7));
  const test = await pythonInstall;
  console.log(test);
})();
