from flask import Flask

from os import path
if path.exists("env.py"):
  import env 
SECRET_KEY = os.environ.get('SECRET_KEY')
SECRET_KEY = os.environ.get('MONGO_DBNAME')
SECRET_KEY = os.environ.get('MONGO_URI')

APP = Flask(__name__)

@APP.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    APP.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            os.environ.get('DEBUG'))