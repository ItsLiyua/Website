@echo off
echo Building website.
docker build -t website .
echo Starting website.
docker run --rm -d --name website -p 8080:80 website:latest

echo Opening firefox.
start /B firefox http://localhost:8080/Website/index.html

pause

echo Stopping website.
docker stop website > /dev/null
echo Stopped website.