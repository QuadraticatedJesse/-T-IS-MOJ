# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=25.8.1

FROM node:${NODE_VERSION}-alpine

# Default runtime mode can be overridden by docker-compose/service env
ENV NODE_ENV=development

WORKDIR /usr/src/app

# Install dependencies (including dev for nodemon reload) in dev mode
COPY package.json package-lock.json ./
RUN npm ci

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY --chown=node:node . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application in watchable mode via compose command override.
CMD if [ "$NODE_ENV" = "development" ]; \
    then npm run dev; \
    else npm start; \
    fi

#CMD ["tail", "-f", "/dev/null"]
