from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from ..db import db

friendships = db.Table('friendships',
  db.Column('source_id', db.Integer, db.ForeignKey('node.id')),
  db.Column('target_id', db.Integer, db.ForeignKey('node.id'))
)

friendOfFriendships = db.Table('friendOfFriendships',
  db.Column('source_id', db.Integer, db.ForeignKey('node.id')),
  db.Column('target_id', db.Integer, db.ForeignKey('node.id'))
)

class Node(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  label = db.Column(db.String)
  role = db.Column(db.String)
  network = db.Column(db.ForeignKey('network.id'));
  friends = db.relationship('Node', secondary='friendships', backref=db.backref('friendOf', lazy='dynamic'))
  friendsOfFriends =db.relationship('Node', secondary='friendOfFriendships', backref=db.backref('friendOfFriend', lazy='dynamic'))

  def __init__(self, label, role):
    self.label = label
    self.role = role

  def __repr__(self):
    return '<Node %r>' % self.label

  def addFriend(networkId, targetId):
    print("Adding Friend")
    self.friends.append()
