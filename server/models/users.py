from flask import flask
from flask.ext.sqlalchemy import SQLAlchemy
from ..db import pgsql
from bcrypt import hashpw

class User(pgsql.Model):
  id = pgsql.Column(pgsql.Integer, primary_key=True)
  username = pgsql.Column(pgsql.String)
  password = pgsql.Column(pgsql.String)

  def __init__(self, username, password):
    self.username = username
    self.password = hashpw(password)

  def __repr__(self):
    return '<User %r>' % self.username

  def validatePassword(self, password):
    if (self.password == hashpw(password)):
      return True
    return False