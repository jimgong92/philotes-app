from redis import Redis
from uuid import uuid4
from datetime import timedelta

SECONDS_PER_DAY = 86400
EXPIRATION_TIME = 7 * SECONDS_PER_DAY
redis = Redis()

def createSession(username):
  sid = str(uuid4())
  redis.set(sid, username)
  refreshSession(sid)
  return sid

def refreshSession(sid):
  redis.expire(sid, EXPIRATION_TIME)

def validateSession(sid, username):
  storedUser = redis.get(sid)
  isValid = False
  if (storedUser == username):
    refreshSession(sid)
    isValid = True
  return isValid

def getUserBySession(sid):
  refreshSession(sid)
  return redis.get(sid)

def destroySession(sid):
  redis.delete(sid)