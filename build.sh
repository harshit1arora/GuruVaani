#!/bin/bash
# Fallback build script for Render deployment

# Navigate to the backend directory
cd backend || exit 1

# Install dependencies
pip install -r requirements.txt

# Return to the root directory
cd ..
