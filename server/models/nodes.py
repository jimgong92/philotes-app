from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from ..db import db
from uuid import uuid1

# friendships = db.Table('friendships',
#   db.Column('source_id', db.Integer, db.ForeignKey('Node.id')),
#   db.Column('target_id', db.Integer, db.ForeignKey('Node.id'))
# )

# friendOfFriendships = db.Table('friendOfFriendships',
#   db.Column('source_id', db.Integer, db.ForeignKey('Node.id')),
#   db.Column('target_id', db.Integer, db.ForeignKey('Node.id'))
# )

class Node(db.Model):
  id = db.Column(db.Integer, primary_key=True, default=lambda : str(uuid1()))
  user = db.Column(db.String)
  label = db.Column(db.String)
  role = db.Column(db.String)
  # friends = db.relationship('Node', secondary='friendships', backref=db.backref('friendOf', lazy='dynamic'))
  # friendsOfFriends = db.relationship('Node', secondary='friendOfFriendships', backref=db.backref('friendOfFriendOf', lazy='dynamic'))

  def __init__(self, user, label, role):
    self.user = user
    self.label = label
    self.role = role

  def __repr__(self):
    return '<Node %r>' % self.label

  def addFriend(self, targetId):
    print("Adding Friend")
    Friendship(self.id, targetId)
    Friendship(targetId, self.id)

class Friendship(db.Model):
  id = db.Column(db.Integer, primary_key=True, default=lambda : str(uuid1()))
  source_id = db.Column('source_id', db.Integer, db.ForeignKey('node.id'))
  friend = db.relationship('Node', backref='friendOf', primaryjoin=(Node.id == source_id))
  target_id = db.Column('target_id', db.Integer, db.ForeignKey('node.id'))
  friendOf = db.relationship('Node', backref='friend', primaryjoin=(Node.id == target_id))

  def __init__(self, source, target):
    self.friend = source
    self.friendOf = target
