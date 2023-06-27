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

DB_HOST=timestable-db.cdpckwejswol.us-east-1.rds.amazonaws.com
DB_PORT=3306
DB_USER=standardUser
DB_PASSWORD=c9YroMrb56VmlseaJ
DB_NAME=TimesTableApp
IDENTITY_URL_REGISTER=https://d1fqjvsk8qffh8.cloudfront.net/register
IDENTITY_URL_LOGIN=https://d1fqjvsk8qffh8.cloudfront.net/login
SESSION_SECRET = lfgudfvY3X7fs6iduhL0Ph7XO
IDENTITY_URL=https://d1fqjvsk8qffh8.cloudfront.net

## For Identity Server

### ### Create a .env file in the /identity-server directory with the following contents:
dbHost=  
dbUser=  
dbPassword=  

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
