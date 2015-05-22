from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from ..db import db

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String)

  def __init__(self, title):
    self.title = title

  def __repr__(self):
    return '<Network %r>' % self.title

  def addNode(nodeId):
    print("Adding Node")