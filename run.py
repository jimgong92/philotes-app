from flask import Flask
from server.db import init_pgsql
from server.config.routes import router

app = Flask(__name__, static_folder='dist', static_url_path='')

app.config.update(
  DEBUG = True,             #Comment out for production
  SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/philotes'
)

init_pgsql(app)
router(app)

if (__name__):
  app.run()