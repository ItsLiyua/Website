#!/bin/bash
echo Building website.
sudo docker build -t website .
echo Starting website.
sudo docker run --rm -d --name website -p 8080:80 website:latest

echo Opening firefox.
firefox http://localhost:8080/Website/index.html > /dev/null &

read -r -n 1 -p "Press any key to close the program."

echo Stopping website.
sudo docker stop website > /dev/null
echo Stopped website.