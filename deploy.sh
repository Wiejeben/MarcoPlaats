#Stop mongodb
systemctl stop mongodb

#Pull from git repo
git pull origin master

cd API
#Install packages
sudo npm install
#Set up docker
docker-compose -p "MarcoPlaats" up

cd ../Frontend

#Install pacages
sudo npm install
#Compile CSS/JS
gulp
