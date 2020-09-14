import datetime
import os

from flask import Flask, Response, request, jsonify
# from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
import json
from bson.json_util import dumps
from pymongo import MongoClient

app = Flask(__name__)
# app.config['MONGODB_SETTINGS'] = {
#     'host': os.environ['MONGODB_HOST'],
#     'username': os.environ['MONGODB_USERNAME'],
#     'password': os.environ['MONGODB_PASSWORD'],
#     'db': 'webapp'
# }

# MongoDB atlas
DB_URI = "mongodb+srv://apiuser:apipassword@webapp.sgcqv.mongodb.net/webapp?retryWrites=true&w=majority"

# API key
# api_key = "46e31e21-edeb-42f9-a517-83a6852c5b35"

app.config['JWT_SECRET_KEY'] = 'secret'

client = MongoClient(DB_URI)
db = client.webapp
# db = MongoEngine(app)
# db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


@app.route("/products")
def products():
    products = db.Products.find()
    return dumps(products)


# class Products(db.Document):
#     Name = db.StringField(required=True)
#     Price = db.DecimalField()
#     BodyLocation = db.StringField(required=True)
#     Category = db.StringField(required=True)
#     CompanyName = db.StringField(required=True)
#     CompanyURL = db.StringField(required=True)
#     CompanyMappingLocation = db.StringField(required=True)
#     CompanyCity = db.StringField(required=True)
#     CompanyUSState = db.StringField(required=True)
#     CompanyCountry = db.StringField(required=True)
#     Source = db.StringField(required=True)
#     Link = db.StringField(required=True)
#     productID = db.IntField(required=True)
#     Image = db.StringField(required=True)
#     inCart = db.BooleanField(default=False)
#     count = db.IntField()
#     total = db.DecimalField()


# class User(db.Document):
#     firstName = db.StringField(required=True)
#     lastName = db.StringField(required=True)
#     username = db.StringField(required=True)
#     email = db.StringField(required=True)
#     password = db.StringField(required=True)
#     termsService = db.BooleanField(default=False)
#     dateAdded = db.DateTimeField(default=datetime.datetime.now)


@app.route("/register", methods=['POST'])
def register():
    try:
        data = json.loads(request.data)
        if data:
            firstName = data['firstName']
            lastName = data['lastName']
            username = data['username']
            email = data['email']
            password = bcrypt.generate_password_hash(
                data['password']).decode('utf-8')
            termsService = data['termsService']
            new_user = db.User.insert_one({'firstName': firstName, 'lastName': lastName, 'username': username,
                                           'email': email, 'password': password, 'termsService': termsService})
        return dumps({'message': 'Success'})
    except Exception as e:
        return dumps({'error': str(e)})


@app.route("/users", methods=['GET'])
def users():
    users = db.User.find()
    return dumps(users)


@app.route("/user/<email>", methods=['GET'])
def user(email):
    emailUser = db.User.find_one({'email': email})
    if emailUser:
        return Response(emailUser, mimetype="application/json", status=200)
    return jsonify({"error: Email does not exist"})


@app.route("/login", methods=['POST'])
def login():
    body = json.loads(request.data)
    if body:
        email = body['email']
        password = body['password']
        result = ""

        rv = db.User.find_one({'email': email})

        if bcrypt.check_password_hash(rv['password'], password):
            access_token = create_access_token(identity={
                                               'firstName': rv['firstName'], 'lastName': rv['lastName'], 'email': rv['email']})
            result = jsonify({"token": access_token})
        else:
            result = jsonify({"error: Invalid email or password"})

        return result


if __name__ == "__main__":
    app.run(debug=True, port=5000)
