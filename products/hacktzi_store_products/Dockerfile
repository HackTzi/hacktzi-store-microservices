# -------------> Build image
FROM node:14.15.5-alpine3.10 AS build   
WORKDIR /products-build
COPY . .
RUN npm install 
RUN npm run prebuild && npm run build

# -------------> Run image 
FROM node:14.15.5-alpine3.10
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /home/node/products
COPY --from=build /products-build/dist ./dist
COPY . .
RUN npm install --only=prod
RUN npm install --only=dev
CMD ["sh", "start-prod.sh"]