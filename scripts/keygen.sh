#!/bin/bash

node -e "console.log('')"
node -e "console.log('--------------------KEYGEN START--------------------')"
node -e "console.log('Generating key pairs for jwt signing and verification')"
node -e "console.log('Algorithm: RSA; Key length: 2048; Format: pem')"

# create keys folder
mkdir -p keys

# generate private key
openssl genrsa -out ./keys/private 2048

# genreate public key using private key
openssl rsa -in ./keys/private -pubout -out ./keys/public.pub
node -e "console.log('---------------------KEYGEN END---------------------')"
node -e "console.log('')"
