# Garmin Connect Flask App

This is an example flask web framework app that are using Python 3 API wrapper for Garmin Connect to get your activity data.

## Resources

1. https://connect.garmin.com/
2. https://pypi.org/project/garminconnect/
3. https://github.com/cyberjunky/python-garminconnect


## Setup

1. Install [python](https://www.python.org/downloads/) if you don't have it. 

2. Clone this repository.

3. Navigate into the project directory:

   ```bash
   $ cd flask-garminconnect
   ```

4. Create a new virtual enviroment:

    *Note: When running the commands, you may need to type python3/pip3 instead of python/pip depending on your setup.*

   ```bash
   $ python -m venv venv
   $ . venv/bin/activate
   ```

5. Install the dependencies (python pacakages) listed in "requirements.txt" file:

   ```bash
   $ pip install -r requirements.txt
   ```

6. Create the enviroment variables file ".env":

   ```bash
   $ touch .env
   ```

7. Add this variables and your garmin connect "EMAIL", "PASSWORD" to the .env file:

   ```bash
    FLASK_APP=app
    FLASK_ENV=development

    EMAIL = "example@test.com"
    PASSWORD = "example123"
   ```

8. Run the app:

   ```bash
   $ flask run
   ```




