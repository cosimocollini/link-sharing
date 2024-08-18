#!/bin/bash

# MAC
# Path to your AppleScript
APPLESCRIPT_PATH="./start.applescript"
# Execute the AppleScript
osascript "$APPLESCRIPT_PATH"

# Open a new terminal tab and run the Vue.js development server
# gnome-terminal -- bash -c "cd /frontend && npm run dev; exec bash"

# Open a new terminal tab and run the Go build and executable
# gnome-terminal -- bash -c "cd /backend && go build -o out && ./out; exec bash"

# WINDOWS
# Open a new PowerShell window and run the Vue.js development server
# Start-Process powershell -ArgumentList "cd /frontend; npm run dev"

# Open a new PowerShell window and run the Go build and executable
# Start-Process powershell -ArgumentList "cd /backend; go build -o out; ./out"