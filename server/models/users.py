from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from ..db import db
from bcrypt import hashpw, gensalt

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, unique=True)
  password = db.Column(db.String)

  def __init__(self, username, password):
    pw_bytes = password.encode('utf-8')
    self.username = username
    self.password = hashpw(pw_bytes, gensalt())

  def __repr__(self):
    return '<User %r>' % self.username

  def validatePassword(self, password):
    hashed = hashpw(password, gensalt())
    stored = self.password.encode('utf-8')
    if (hashpw(stored, hashed)):
      return True
    return False