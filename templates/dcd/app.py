from flask import Flask
import os
from os import path
if path.exists("env.py"):
  import env 
SECRET_KEY = os.environ.get('SECRET_KEY')
MONGO_DBNAME = os.environ.get('MONGO_DBNAME')
MONGO_URI = os.environ.get('MONGO_URI')


APP = Flask(__name__)

@APP.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    APP.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=os.environ.get('DEBUG'))