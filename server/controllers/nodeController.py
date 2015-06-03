from ..db import db
from ..models.nodes import Node

def createNode(data):
  data = json.loads(request.data)
  user = getUserBySession(data['sid'])
  label = data['label']
  role = data['role']
  friends = data['friends']

  node = Node(user, label, role)
  db.session.add(node)
  db.session.commit()
  return node