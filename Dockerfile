FROM node:14.7.0-alpine

LABEL maintainer="Sente Group"

ARG APP_NAME="app"
ARG APP_HOME="/home/${APP_NAME}"
ARG APP_DIR="/var/www/${APP_NAME}"
ARG BACKEND_DIR_PATH="apps/backend"
ARG DESIGNER_DIR_PATH="apps/designer"
ARG REPORT_DIR_PATH="apps/report"
ARG DESIGNER_DIR="${APP_DIR}/${DESIGNER_DIR_PATH}"
ARG REPORT_DIR="${APP_DIR}/${REPORT_DIR_PATH}"
ARG BACKEND_DIR="${APP_DIR}/${BACKEND_DIR_PATH}"
ARG BACKEND_PORT="3333"

ENV PORT=${BACKEND_PORT}

ARG NODE_ENV="production"

# install lerna
RUN npm install -g lerna

# copy all to APP_DIR
COPY . ${APP_DIR}

# apps, deps and build
RUN cd ${APP_DIR} \
    && yarn install --production=false \
    && yarn postinstall

RUN cd ${DESIGNER_DIR} && yarn build

RUN cd ${REPORT_DIR} && yarn build

RUN cd ${BACKEND_DIR} && yarn build

# run
WORKDIR ${BACKEND_DIR}
EXPOSE ${PORT}
CMD NODE_ENV=production API_PORT=${PORT} node dist/main.js
