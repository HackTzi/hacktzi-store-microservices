FROM node:14.15.4
WORKDIR /products
COPY . .
RUN npm install --silent
RUN npm run build
CMD [ "npm", "run","start:prod" ]