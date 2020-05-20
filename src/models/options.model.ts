interface UserOptions {
  name: [];
  git: boolean;
  template: Templates;
  clean: boolean;
  gitpod: boolean;
  env: boolean;
  envName: string;
  createENV: boolean;
}

interface Templates {
  name: string;
  python: boolean;
  django: boolean;
  flask: boolean;
  js: boolean;
}
