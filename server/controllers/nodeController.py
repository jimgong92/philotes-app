from ..db import db
from ..models.nodes import Node
from authController import *

def createNode(data):
  user = getUserBySession(data['sid'])
  label = data['label']
  role = data['role']
  friends = data['friends']

  node = Node(user, label, role)
  db.session.add(node)
  db.session.commit()
  return {
    "id": node.id,
    "label": node.label, 
    "role": node.role
  }

def getAllNodesByUser(username):
  nodes = db.session.query(Node).filter_by(user=username)
  res = []
  for node in nodes:
    res.append(objectify(node))
  return res

def objectify(node):
  return {
    "id": node.id,
    "label": node.label, 
    "role": node.role
  }