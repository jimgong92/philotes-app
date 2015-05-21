from flask import Flask
from flask_sqlalchemy import SQLAlchemy

pgsql = None

def init_pgsql(app):
  pgsql = SQLAlchemy(app)

