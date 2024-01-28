FROM node:18

ENV NODE_ENV development

WORKDIR /server

# Copy wait script
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

# Copy all the files from the project’s root to the working directory
COPY . .

RUN npm run setup

RUN chmod +x migrate-and-start.sh

RUN npx prisma generate

EXPOSE $PORT

# Wait for MySQL and Nats server to be ready then start the server
CMD /wait && ./migrate-and-start.sh