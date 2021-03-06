// prettier-ignore
/**
 * Generate environmental variables
 * for env.py
 * @param {UserOptions} options
 * @returns {Promise<String>} Hostname and random generated string
 */
export async function generateENVFile(options: UserOptions): Promise<string> {
  return `import os
os.environ["HOSTNAME"] = "0.0.0.0"
os.environ["SECRET_KEY"] =  "${Math.random()
   .toString(36)
   .substring(2, 15) +
   Math.random()
     .toString(36)
     .substring(2, 15)}"
os.environ["DEV"]: "1"
${options.template.flask ? flaskOnly() : djangoOnly()}`
}

/**
 * Generate variables only used by flask
 * @returns {String} MongoDB information and Port
 */
function flaskOnly(): string {
  return `os.environ["MONGO_URI"] ="YOUR MONGO URI GOES HERE"
os.environ["MONGO_DBNAME"] ="YOUR MONGO DB NAME GOES HERE"
os.environ["PORT"] ="5000"
`;
}

/**
 * Generate variables only used by Django
 * @returns {String} Stripe & AWS information
 */
function djangoOnly(): string {
  return `os.environ["STRIPE_PUBLISHABLE"] = ""
os.environ["STRIPE_SECRET"] = ""
os.environ["AWS_ACCESS_KEY_ID"] = ""
os.environ["AWS_SECRET_ACCESS_KEY"] = ""
os.environ["AWS_STORAGE_BUCKET_NAME"] = ""
  `;
}
