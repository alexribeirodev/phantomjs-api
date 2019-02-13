FROM node:lts-alpine

ENV PORT 3000

EXPOSE ${PORT}

COPY . .
RUN npm install

ENTRYPOINT [ "npm", "run", "prod" ]