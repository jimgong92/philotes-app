from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from ..db import db

class Node(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  label = db.Column(db.String)
  role = db.Column(db.String)
  network = db.Column(db.ForeignKey('network.id'));

  def __init__(self, label, role):
    self.label = label
    self.role = role

  def __repr__(self):
    return '<Node %r>' % self.label

  def addFriend(networkId, targetId):
    print("Adding Friend")