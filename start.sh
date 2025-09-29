#!/bin/bash

# Exit on error
set -e

# # Install Node modules and build React
# npm install --prefix clients
# npm run build --prefix clients


# Change to server directory where app.py is located
# cd server

# Run the Flask app with gunicorn
python -m gunicorn server.app:app --bind 0.0.0.0:$PORT

