from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from ..db import db

class Network(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String)
  user = db.Column(db.ForeignKey('user.id'))

  def __init__(self, title):
    self.title = title

  def __repr__(self):
    return '<Network %r>' % self.title