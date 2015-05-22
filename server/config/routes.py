from flask import request
from ..db import db
from ..models.users import User
import json

def router(app):
  db.create_all()

  @app.route('/')
  def index():
    return app.send_static_file('index.html')
  @app.route('/auth/signup', methods=['POST'])
  def signup():
    if (request.method == 'POST'):
      data = json.loads(request.data)
      
      userExists = User.query.filter_by(username=data['username']).first()
      if(bool(userExists)):
        return 'false'

      user = User(data['username'], data['password'])
      db.session.add(user)
      db.session.commit()
      return 'true'
      
  @app.route('/auth/login', methods=['POST'])
  def login():
    if (request.method == 'POST'):
      data = json.loads(request.data)
      
      user = User.query.filter_by(username=data['username']).first()
      if(bool(user)):
        pw_bytes = data['password'].encode('utf-8')
        validPw = user.validatePassword(pw_bytes)
        if(validPw):
          #Also return user networks
          return 'true'

      return 'false'
  @app.route('/auth/logout')
  def logout():
    return 'Hello from Logout'

def load_models():
  import server.models.users