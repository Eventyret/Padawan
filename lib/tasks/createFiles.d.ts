/**
 * Generates README and Markdown files
 * @param {Object} options
 */
export declare function createMarkdown(options: any): Promise<void>;
/**
 * Generates a custom .gitignore file depending on project
 * @param {Object} options
 */
export declare function createGitIgnore(options: any): Promise<void>;
/**
 * Generates a custom Procfile depending on project
 * @param {Object} options
 */
export declare function createProcfile(options: any): Promise<void>;
/**
 * Generates HTML for projects
 * @param {Object} options
 */
export declare function createHTML(options: any): Promise<void>;
/**
 * Generates env.py used for python projects
 * @param {Object} options
 */
export declare function createENVPy(options: any): Promise<void>;
/**
 *  Generates vscode settings per project.
 * @param {Object} options
 */
export declare function createVSCodeSettings(options: any): Promise<void>;
