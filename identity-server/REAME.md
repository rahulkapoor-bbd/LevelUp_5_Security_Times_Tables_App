# For Identity Server

## Needs .env with
dbHost=  
dbUser=  
dbPassword=  

## Public and private key
### generate a private key:  
openssl genrsa -out ./private.key 4096  
### generate its public key:  
openssl rsa -in private.key -pubout -outform PEM -out public.key  
