# https://medium.com/swlh/deploy-nest-js-app-with-postgres-in-vps-e1ce4abd2cad

sudo apt-get update 
sudo apt-get upgrade -y

git clone https://github.com/Johudo/Printer-Service

# ------------------------------
# ------ Install Postgres ------
# ------------------------------

sudo apt-get install postgresql postgresql-contrib

# TODO: COPY .env AND WRITE INFO IN 

sudo -u postgres psql
create database printer;
create user printeruser with encrypted password 'printer307kaf';
grant all privileges on database printer to printeruser;
\\c printer;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
# exit
\\q


# ----------------------------
# ------ Install NodeJS ------
# ----------------------------

# curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs npm
sudo npm install pm2@latest -g
sudo npm i -g @nestjs/cli

# Install Packages
npm install
cd ./frontend
npm install
cd ..

# Build backend
npm run makemigration -- "InitDatabase"
npm run migrate

# Build frontend
cd ./frontend
npm run build

cd ..

sudo pm2 start dist/src/main.js --name printer
sudo pm2 startup systemd
sudo systemctl enable pm2-root
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi --service-name printer
sudo pm2 save


# ---------------------------
# ------ Install Nginx ------
# ---------------------------

sudo apt-get install nginx ufw -y
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable

sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/printer.307
sudo ln -s /etc/nginx/sites-available/printer.307 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Adding admin 
# sudo -u postgres psql
# \\c printer
# update "user" set "isAdmin"=true where id=1;
# \\q