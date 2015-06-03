from ..models.nodes import Node

def createNode(data):
  data = json.loads(request.data)
  user = getUserBySession(data['sid'])
  label = data['label']
  role = data['role']
  friends = data['friends']

  node = Node(user, label, role)
  return node