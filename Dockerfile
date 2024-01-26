FROM node:18

ENV NODE_ENV development

WORKDIR /server

COPY . .

RUN npm install
RUN npm run build
RUN npx prisma generate

RUN cd ./dist

EXPOSE $PORT

CMD [ "npm", "start" ]