FROM node:16-alpine

WORKDIR /usr/src/

COPY . /usr/src/

EXPOSE 4000

RUN npm install
RUN npm run build

CMD ["npm", "start"]
