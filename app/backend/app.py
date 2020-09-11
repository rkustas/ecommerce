import datetime
import os

from flask import Flask, Response, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
import json

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}

# app.config['MONGODB_SETTINGS'] = {
#     'host': os.environ['MONGODB_HOST'],
#     'username': os.environ['MONGODB_USERNAME'],
#     'password': os.environ['MONGODB_PASSWORD'],
#     'db': 'webapp'
# }
app.config['JWT_SECRET_KEY'] = 'secret'

db = MongoEngine()
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


class Products(db.Document):
    Name = db.StringField(required=True)
    Price = db.DecimalField()
    BodyLocation = db.StringField(required=True)
    Category = db.StringField(required=True)
    CompanyName = db.StringField(required=True)
    CompanyURL = db.StringField(required=True)
    CompanyMappingLocation = db.StringField(required=True)
    CompanyCity = db.StringField(required=True)
    CompanyUSState = db.StringField(required=True)
    CompanyCountry = db.StringField(required=True)
    Source = db.StringField(required=True)
    Link = db.StringField(required=True)
    productID = db.IntField(required=True)
    Image = db.StringField(required=True)
    inCart = db.BooleanField(default=False)
    count = db.IntField()
    total = db.DecimalField()


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
        password = bcrypt.generate_password_hash(
            body['password']).decode('utf-8')
        termsService = body['termsService']
        new_user = User(firstName=firstName, lastName=lastName, username=username,
                        email=email, password=password, termsService=termsService).save()
        return Response(new_user, mimetype="application/json", status=200)


@app.route("/users", methods=['GET'])
def users():
    users = User.objects().to_json()
    return Response(users, mimetype="application/json", status=200)


@app.route("/user/<email>", methods=['GET'])
def user(email):
    emailUser = User.objects(email=email).to_json()
    if emailUser:
        return Response(emailUser, mimetype="application/json", status=200)
    return jsonify({"error: Email does not exist"})


@app.route("/login", methods=['POST'])
def login():
    body = request.get_json()
    if body:
        email = body['email']
        password = body['password']
        result = ""

        rv = User.objects(email=email).first_or_404()

        if bcrypt.check_password_hash(rv['password'], password):
            access_token = create_access_token(identity={
                                               'firstName': rv['firstName'], 'lastName': rv['lastName'], 'email': rv['email']})
            result = jsonify({"token": access_token})
        else:
            result = jsonify({"error: Invalid email or password"})

        return result


@app.route("/products", methods=['GET'])
def products():
    with open("data.json", "r") as productData:
        product = json.load(productData)
        return jsonify(product)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
