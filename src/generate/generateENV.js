// prettier-ignore
export function generateENVFile(options) {
  return `import os

os.environ["HOSTNAME"] = "0.0.0.0"
os.environ["SECRET_KEY"] =  "${Math.random()
   .toString(36)
   .substring(2, 15) +
   Math.random()
     .toString(36)
     .substring(2, 15)}"
os.environ["DEV"]: "1"
${options.template.flask ? flaskOnly() : djangoOnly()}` // jshint ignore:line
}

function flaskOnly() {
  return `os.environ["MONGO_URI"] ="YOUR MONGO URI GOES HERE"
os.environ["MONGO_DBNAME"] ="YOUR MONGO DB NAME GOES HERE"
os.environ["PORT"] ="5000"
`;
}

function djangoOnly() {
  return `os.environ["STRIPE_PUBLISHABLE"] = ""
os.environ["STRIPE_SECRET"] = ""
os.environ["AWS_ACCESS_KEY_ID"] = ""
os.environ["AWS_SECRET_ACCESS_KEY"] = ""
os.environ["AWS_STORAGE_BUCKET_NAME"] = ""
  `;
}
