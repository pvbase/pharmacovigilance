FROM node:8.9

WORKDIR /app
COPY . .
RUN npm install

# if we don't use this specific form, SIGINT/SIGTERM doesn't get forwarded
CMD node server.js
