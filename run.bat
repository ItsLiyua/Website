@echo off
echo Building website.
docker build -t website .
echo Starting website.
docker run --rm -d --name website -p 8080:80 website:latest

echo.
echo Open a Webbrowser and go to localhost:8080/Website/index.html
echo Press any key to stop the server.
echo.
pause >nul

echo Stopping website.
docker container stop website >nul
echo Stopped website.

timeout /t 5
