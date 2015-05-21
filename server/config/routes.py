def router(app):
  @app.route('/')
  def index():
    return app.send_static_file('index.html')
  @app.route('/auth/signup')
  def signup():
    return 'Hello from Signup'
  @app.route('/auth/login')
  def login():
    return 'Hello from Login'
  @app.route('/auth/logout')
  def logout():
    return 'Hello from Logout'