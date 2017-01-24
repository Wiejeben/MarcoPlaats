# start from bitnami apache
FROM httpd:2.4

# Install Node.js, npm and ruby
RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y curl  
RUN curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN npm install -g gulp-cli

# Storage directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/

# Create symlink to keep files in sync
RUN rm -R /usr/local/apache2/htdocs
RUN ln -s /usr/src/app/public /usr/local/apache2/htdocs

RUN npm prune
RUN npm install

# compile css & js
RUN gulp --production

EXPOSE 80