FROM node:18-alpine AS build

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:latest
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY default-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080