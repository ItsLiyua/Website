#!/bin/bash
sudo docker build -t website .
sudo docker run --rm -d --name website -p 8080:80 website:latest

firefox http://localhost:8080/

read -n 1 -p "Press any key to close the program." key

echo Stopping website.
sudo docker stop website > /dev/null
echo Stopped website.