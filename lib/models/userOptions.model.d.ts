interface UserOptions {
    name: string;
    git: boolean;
    template: Templates;
    clean: boolean;
    gitpod: boolean;
    env: boolean;
    envName: string;
    createENV: boolean;
    targetDirectory?: string;
    templateDirectory?: string;
    commonDir?: string;
    backendDir?: string;
    frontendDir?: string;
}
