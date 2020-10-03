/**
 * Generates README and Markdown files
 * @param {UserOptions} options
 */
export declare function createMarkdown(options: UserOptions): Promise<void>;
/**
 * Generates a custom .gitignore file depending on project
 * @param {UserOptions} options
 */
export declare function createGitIgnore(options: UserOptions): Promise<void>;
/**
 * Generates a custom Procfile depending on project
 * @param {UserOptions} options
 */
export declare function createProcfile(options: UserOptions): Promise<void>;
/**
 * Generates HTML for projects
 * @param {UserOptions} options
 */
export declare function createHTML(options: UserOptions): Promise<void>;
/**
 * Generates env.py used for python projects
 * @param {UserOptions} options
 */
export declare function createENVPy(options: UserOptions): Promise<void>;
/**
 *  Generates vscode settings per project.
 * @param {UserOptions} options
 */
export declare function createVSCodeSettings(options: UserOptions): Promise<void>;
