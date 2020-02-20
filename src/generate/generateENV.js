// prettier-ignore
export function generateENVFile() {
  return `
import os

os.environ["MONGO_URI"] = "YOUR MONGO URI GOES HERE"
os.environ["MONGO_DBNAME"] = "YOUR MONGO DB NAME GOES HERE"
os.environ["SECRET_KEY"] =  "${Math.random()
   .toString(36)
   .substring(2, 15) +
   Math.random()
     .toString(36)
     .substring(2, 15)}"
os.environ["DEBUG"]: "1"
os.environ["IP"] = "0.0.0.0"
os.environ["PORT"] = 5000` // jshint ignore:line
}
