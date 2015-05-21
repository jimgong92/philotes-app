from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

pgsql = None

def init_pgsql(app){
  pgsql = SQLAlchemy(app)
}
