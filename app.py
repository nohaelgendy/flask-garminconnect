import os
from flask import Flask, redirect, render_template, request, url_for, jsonify
from garminconnect import Garmin
import datetime

app = Flask(__name__)

email = os.getenv("EMAIL")
password = os.getenv("PASSWORD")
# Define api at the global level
api = None

@app.route("/", methods=("GET", "POST"))
def index():
    global api
    if request.method == "POST":
        return render_template("index.html", data = "data")
    username = ""
    try:
        #Init API 
        api = init_garmin_api(email, password)
        username = api.get_full_name()
        #pass
    except Exception as e:
        error_message = handle_error(e)
        return render_template("error.html", message=error_message)

    return render_template("index.html", username = username)

def init_garmin_api(email, password):
    try:  
        api = Garmin(email, password)
        api.login() 
    except: 
        return "Garmin Connect Server is not working!!! Please try later."
    return api

@app.route('/my-steps-route/<date>')
def my_steps_function(date):
    date = datetime.datetime.strptime(date, '%Y-%m-%d') #convert str to datetime
    steps_data = api.get_steps_data(date.isoformat())
    stepGoal = 5310
    if steps_data:
        stepstotal = sum([i['steps'] for i in steps_data])
        stepsPer = str(int((stepstotal/stepGoal)*100)) + "%"
    else: 
        stepstotal = 0
        stepsPer = "0%"

    steps_dict = {'stepstotal' : stepstotal,
                  'stepsPer': stepsPer,
                  'stepGoal': stepGoal
                 }
    return jsonify(steps_dict)

def handle_error(e):
    if "401" in str(e):
        return "Invalid email or password."
    elif "ConnectTimeout" in str(e):
        return "Garmin Connect Server is not responding. Please try again later."
    else:
        return "An unknown error occurred. Please try again later."

@app.route("/error")
def error():
    message = "This is an error message."
    return render_template("error.html", message=message)