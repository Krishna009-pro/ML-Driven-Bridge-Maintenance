@echo off
echo ==============================================
echo Installing Backend Dependencies...
echo ==============================================
cd /d "K:\ML Driven Predictive Maintenance and Lifespan Detection\Project Source Code\UI - react and node(backend)\Final UI\backend"
call npm install

echo ==============================================
echo Installing Frontend Dependencies...
echo ==============================================
cd /d "K:\ML Driven Predictive Maintenance and Lifespan Detection\Project Source Code\UI - react and node(backend)\Final UI"
call npm install

echo ==============================================
echo Setting up the Database...
echo ==============================================
cd /d "K:\ML Driven Predictive Maintenance and Lifespan Detection\Project Source Code\UI - react and node(backend)\Final UI\backend"
node import_db.js

echo ==============================================
echo Starting Backend Server (Port 5000)...
echo ==============================================
start "Backend Server" cmd /c "cd /d "K:\ML Driven Predictive Maintenance and Lifespan Detection\Project Source Code\UI - react and node(backend)\Final UI\backend" && node server.js"

echo ==============================================
echo Starting Frontend React App (Port 5173)...
echo ==============================================
start "Frontend Server" cmd /c "cd /d "K:\ML Driven Predictive Maintenance and Lifespan Detection\Project Source Code\UI - react and node(backend)\Final UI" && npm run dev"

echo ==============================================
echo SETUP COMPLETE! You can close this window.
echo The servers are running in two new windows...
echo ==============================================
pause
