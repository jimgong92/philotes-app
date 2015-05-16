from flask import Flask
from server.config.routes import router

app = Flask(__name__, static_folder='dist', static_url_path='')

router(app)

if (__name__):
  app.run()