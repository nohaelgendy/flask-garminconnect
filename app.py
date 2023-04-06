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

    #Init API 
    api = init_garmin_api(email, password)

    #TODO: Handle Error!

    username = api.get_full_name()
    return render_template("index.html", username = username)

def init_garmin_api(email, password):
    try:  
        api = Garmin(email, password)
        api.login() 
    except: 
        return "Garmin Connect Server is not working!!! Please try later."
    return api