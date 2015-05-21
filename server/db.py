from flask import Flask
from flask_sqlalchemy import SQLAlchemy

uri_provider = Flask('uri_provider')
uri_provider.config.update(
  SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/philotes'
)

db = SQLAlchemy(uri_provider)