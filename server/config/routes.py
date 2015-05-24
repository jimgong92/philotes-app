from flask import request, jsonify
from ..db import db
from ..models.users import User
from ..controllers.authController import createSession, validateSession
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
      username = data['username']
      password = data['password']

      userObj = {
        'isTaken': True,
        'sid': None
      }

      userExists = User.query.filter_by(username=username).first()
      if(not bool(userExists)):
        user = User(username, password)
        db.session.add(user)
        db.session.commit()
        userObj['isTaken'] = False
        userObj['sid'] = createSession(username)

      return jsonify(userObj)
      
  @app.route('/auth/login', methods=['POST'])
  def login():
    if (request.method == 'POST'):
      data = json.loads(request.data)

      userObj = {
        'isValid': False
      }

      user = User.query.filter_by(username=data['username']).first()
      if(bool(user)):
        pw_bytes = data['password'].encode('utf-8')
        validPw = user.validatePassword(pw_bytes)
        if(validPw):
          #Also return user networks
          userObj['isValid'] = True

      return jsonify(userObj)
  
  @app.route('/auth/logout')
  def logout():
    return 'Hello from Logout'