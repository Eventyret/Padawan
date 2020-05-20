/**
 * This will return the name of the platform
 * @returns {Promise<String>} - Name of platform
 */
export declare function getOS(): Promise<string | undefined>;
/**
 * Creating custom title
 * @param {String} text - The text to display
 * @param {*} font - The Font used
 */
export declare function title({ text, font }: {
    text: string;
    font: any;
}): Promise<void>;
