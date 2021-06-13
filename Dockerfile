FROM node:14.16.0-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install
RUN npm install ts-node -g
RUN npm install typescript -g
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
