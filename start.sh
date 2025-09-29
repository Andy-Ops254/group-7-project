#!/bin/bash

# Exit on error
set -e

# # Install Node modules and build React
# npm install --prefix clients
# npm run build --prefix clients

# Run the Flask app with gunicorn
exec gunicorn app:app --bind 0.0.0.0:$PORT

