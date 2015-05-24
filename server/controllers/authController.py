from redis import Redis, set, get, expire, delete
from uuid import uuid4
from datetime import timedelta

EXPIRATION_TIME = 7
redis = Redis()

def createSession(username):
  sid = str(uuid4())
  redis.set(sid, username)
  refreshSession(sid)
  return sid

def refreshSession(sid):
  redis.expire(sid, timedelta(day=EXPIRATION_TIME))

def validateSession(sid, username):
  storedUser = redis.get(sid)
  isValid = False
  if (storedUser == username):
    refreshSession(sid)
    isValid = True
  return isValid