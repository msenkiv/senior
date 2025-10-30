# Deploy:: Senior Microservice
# # Default: gru.ocir.io/grqn05sriwg6/brado/ms-senior:<year>.<month>.<day>.<seq_build_day>
# # Example: gru.ocir.io/grqn05sriwg6/brado/ms-senior:2020.07.17.1

# Base image for the project
ARG BASE_IMAGE=gru.ocir.io/grqn05sriwg6/brado/oracle-base:2025.03.05.1

# Multi-stage build
# Stage 1: Starting with the base installations for the project
FROM ${BASE_IMAGE} AS builder

# working directory
WORKDIR /app

# copy the package.json file to the working directory and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# copy files to working directory and build project
COPY . .
RUN npm run build

# Stage 2: preparing final image
FROM ${BASE_IMAGE} AS final

# working directory
WORKDIR /usr/src/app

# create a group and user for the application
RUN groupadd -r microservice && useradd -r -g microservice senior

# copy installed dependencies and build from previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# install dependencies for production
RUN npm ci --omit=dev

# set permissions for user
RUN chown -R senior:microservice /usr/src/app

# switch to user
USER senior

# expose application port
EXPOSE 8080

# start application
CMD ["npm", "run", "start:prod"]
