FROM node:16-alpine

WORKDIR /app

COPY . .

EXPOSE 4000

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]