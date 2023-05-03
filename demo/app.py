from flask import Flask, request, make_response, render_template
import sqlite3

app = Flask(__name__)

# create a connection to the SQLite database
conn = sqlite3.connect('health_records.db', check_same_thread=False)
c = conn.cursor()

# create a table to store user data
c.execute('''CREATE TABLE IF NOT EXISTS users
             (username TEXT PRIMARY KEY, password TEXT)''')

# create a table to store health records
c.execute('''CREATE TABLE IF NOT EXISTS health_records
             (id INTEGER PRIMARY KEY AUTOINCREMENT, 
             username TEXT, 
             weight INTEGER,
             height INTEGER,
             age INTEGER)''')

# insert some example data
# c.execute("INSERT INTO users VALUES ('user1', 'password1')")
# c.execute("INSERT INTO health_records (username, weight, height, age) VALUES ('user1', 70, 180, 35)")

conn.commit()

# define a login function that checks for a valid cookie and logs the user in if it exists
def login():
    spock_request = request.cookies.get('spock_request')
    if spock_request == 'live_long_and_prosper':
        return True
    else:
        return False

# define a route for the home page
@app.route('/')
def home():
    # check if the user is logged in
    if not login():
        return 'Please log in to view this page.'
    
    # get the user's health record from the database
    c.execute("SELECT * FROM health_records WHERE username='user1'")
    record = c.fetchone()
    
    # make some assumptions based on the data
    bmi = record[2] / (record[3] / 100) ** 2
    if record[4] < 40 and bmi < 30:
        assumption = 'You are in good health.'
    else:
        assumption = 'You may need to make some lifestyle changes.'
    
    # return the assumption
    return assumption

# define a route for the login page
@app.route('/login')
def login_page():

    resp = make_response('You are now logged in.')
    resp.set_cookie('spock_request', 'live_long_and_prosper')
    return resp

@app.route('/admin')
def admin():
    # check if the user is logged in
    if not login():
        return 'Please log in to view this page.'
    
    # get all the users from the database
    users = get_users()
    
    # render the admin panel template
    return users

def get_users():
    # create a connection to the SQLite database
    conn = sqlite3.connect('health_records.db', check_same_thread=False)
    c = conn.cursor()
    
    # retrieve all the users from the database
    c.execute("SELECT * FROM users")
    users = c.fetchall()
    
    # close the database connection and return the users
    conn.close()
    return users

if __name__ == '__main__':
    app.run(debug=True)
