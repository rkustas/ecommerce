import datetime
import os
 
from flask import Flask, Response, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}
app.config['JWT_SECRET_KEY'] = 'secret'

db = MongoEngine()
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

class User(db.Document):
    firstName = db.StringField(required=True)
    lastName = db.StringField(required=True)
    username = db.StringField(required=True)
    email = db.StringField(required=True)
    password = db.StringField(required=True)
    termsService = db.BooleanField(default=False)
    dateAdded = db.DateTimeField(default=datetime.datetime.now)

@app.route("/register", methods=['POST'])
def register():
    body = request.get_json()
    if body:
        firstName = body['firstName']
        lastName = body['lastName']
        username = body['username']
        email = body['email']
        password = bcrypt.generate_password_hash(body['password']).decode('utf-8')
        termsService = body['termsService']
        new_user = User(firstName=firstName,lastName=lastName,username=username,email=email,password=password,termsService=termsService).save()
        return Response(new_user,mimetype="application/json", status=200)

@app.route("/users", methods=['GET'])
def users():
    users = User.objects().to_json()
    return Response(users, mimetype="application/json", status=200)

@app.route("/login", methods=['POST'])
def login():
    body = request.get_json()
    if body:
        username = body['username']
        password = body['password']
        result = ""

        rv = User.objects(username=username).first_or_404()

        if bcrypt.check_password_hash(rv['password'], password):
            access_token = create_access_token(identity= {'firstName': rv['firstName'],'lastName': rv['lastName'],'username':rv['username']})
            result = jsonify({"token":access_token})
        else:
            result = jsonify({"error":"Invalid username and password"})

        return result

if __name__ == "__main__":
    app.run(debug=True, port=5000)