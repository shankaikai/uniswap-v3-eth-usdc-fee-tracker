FROM node:18

ENV NODE_ENV production

WORKDIR /server

# Copy all the files since we have run setup beforehand
COPY . .
RUN chmod +x migrate-and-start.sh

RUN npx prisma generate

EXPOSE $PORT

# Push DB schema and then start the server
CMD ./migrate-and-start.sh