# start from bitnami apache
FROM httpd:2.4

# Install Node.js, npm and ruby
RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y curl  
RUN curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs


# install npm basic dependencies
RUN npm install --global gulp-cli

COPY . /usr/local/apache2/htdocs/
WORKDIR /usr/local/apache2/htdocs/

RUN npm install

# compile css & js
RUN gulp --production

EXPOSE 80