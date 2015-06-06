from flask import request, jsonify
from ..db import db
from ..models.users import User
from ..models.nodes import Node
from ..controllers.authController import *
from ..controllers.userController import *
from ..controllers.nodeController import *
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
      user = createUserNX(data)

      userObj = {
        'isTaken': True,
        'sid': None
      }

      if(user is not None):
        userObj['isTaken'] = False
        userObj['sid'] = createSession(user.username)

      return jsonify(userObj)
      
  @app.route('/auth/login', methods=['POST'])
  def login():
    if (request.method == 'POST'):
      data = json.loads(request.data)
      username = data['username']
      password = data['password']

      userObj = {
        'isValid': True,
        'sid': None
      }

      user = User.query.filter_by(username=username).first()
      if(bool(user)):
        pw_bytes = password.encode('utf-8')
        validPw = user.validatePassword(pw_bytes)
        if(validPw):
          #Also return user networks
          userObj['isValid'] = True
          userObj['sid'] = createSession(username)

      return jsonify(userObj)
  
  @app.route('/auth/logout', methods=['POST'])
  def logout():
    if (request.method == 'POST'):
      data = json.loads(request.data)
      sid = data['sid']
      destroySession(sid)
    return 'Successful logout'

  @app.route('/user/info', methods=['GET'])
  def getUserInfo():
    if (request.method == 'GET'):
      sid = request.args.get('sid')
      result = {
        'username': getUserBySession(sid)
      }
      return jsonify(result)

  @app.route('/node/add', methods=['POST'])
  def addNode():
    if (request.method =='POST'):
      data = json.loads(request.data)
      return jsonify(createNode(data))

  @app.route('/api/network/', methods=['GET'])
  def getNetwork():
    if (request.method == 'GET'):
      sid = request.args.get('sid')
      username = getUserBySession(sid)
      print (getAllNodesByUser(username))
      return 200