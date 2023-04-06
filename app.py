import os
from flask import Flask, redirect, render_template, request, url_for
from garminconnect import Garmin

app = Flask(__name__)

email = os.getenv("EMAIL")
password = os.getenv("PASSWORD")

@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        return render_template("index.html", data = "data")
    username = ""
    try:
        #Init API 
        # api = init_garmin_api(email, password)
        # username = api.get_full_name()
        pass
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