/**
 * Copies the setup folder per project.
 * @param {UserOptions) options
 */
export declare function copyFiles(options: UserOptions, type: string): Promise<void>;
/**
 * Creates the main Project directory.
 * @param {UserOptions} options
 * @returns {Promise} Target Directory if created
 */
export declare function createProjectDir(options: UserOptions): Promise<any>;
