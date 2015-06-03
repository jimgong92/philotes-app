from ..db import db
from ..models.users import User

def createUserNX(data):
  username = data['username']
  password = data['password']

  userExists = User.query.filter_by(username=username).first()
  if(not bool(userExists)):
    user = User(username, password)
    db.session.add(user)
    db.session.commit()
    return user
  return None