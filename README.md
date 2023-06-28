# LevelUp_5_Security_Times_Tables_App
Code for Times Tables App for the Security Level Up

# How to run locally
1. Setup databases
2. Setup Node Environment

## Setting up databases
We use MySql for our databases. Install MySQL workbench to work with our databases easier

### Resource DB
In MySQL workbench run the scripts in the /db-scripts/resoruce-db folder to create and populate the db with necessary information

### Identity DB
In MySQL workbench run the scripts in the /db-scripts/identity-db folder to create and populate the db with necessary information

## Node Envoronment
We use Nodejs for our environment and backend, please install Nodejs here:
 
## For Resoruce Server and Application

### Create a .env file in the root directory with the following contents:

DB_HOST=http:localhost
DB_PORT=//Your port
DB_USER=//Your Db username
DB_PASSWORD=//Your DB password
DB_NAME=TimesTableApp
IDENTITY_URL_REGISTER=http://localhost/register
IDENTITY_URL_LOGIN=http://localhost/login
SESSION_SECRET = //Your session secret
IDENTITY_URL=https://localhost

## For Identity Server

### ### Create a .env file in the /identity-server directory with the following contents:
dbHost=
dbUser=
dbPassword=
issuer=
audience=
pepper=
PORT=
resourceServerCallback=

### Public and private key
You must have openssl installed
#### generate a private key:  
openssl genrsa -out ./private.key 4096  
#### generate its public key:  
openssl rsa -in private.key -pubout -outform PEM -out public.key 

## Run the applicaiotn

## Identity server
in the /identity-server directory, run 'npm i'
then run 'node index.js'

## Resoruce server
Open a second terminal window. in the /resource-server directory, run 'npm i'
then run 'npm start'
