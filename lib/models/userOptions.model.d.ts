interface UserOptions {
    name: any;
    git: any;
    template: Templates;
    clean: boolean;
    gitpod: any;
    env: any;
    envName: any;
    createENV: boolean;
    targetDirectory?: any;
    templateDirectory?: string;
    commonDir?: string;
    backendDir?: string;
    frontendDir?: string;
    target?: PythonSettings;
    error?: boolean;
}
