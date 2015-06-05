class LinkedListNode():
  def __init__(self, value=None):
    self.value = value
    self.prev = None
    self.next = None

  def setPrev(self, node):
    self.prev = node

  def setNext(self, node):
    self.next = node

  def getPrev(self):
    return self.prev

  def getNext(self):
    return self.next