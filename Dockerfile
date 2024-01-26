FROM node:18

ENV NODE_ENV production

WORKDIR /server

# Copy all the files since we have run setup beforehand
COPY . .

RUN npx prisma generate

EXPOSE $PORT

CMD [ "npm", "start" ]