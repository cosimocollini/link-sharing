FROM node:lts-alpine AS base
WORKDIR /app
COPY package*.json vite.config.ts ./
RUN npm ci

FROM base AS dev
COPY src/ src/

FROM dev AS build

RUN npm run build

# FROM node:lts-alpine AS build
# WORKDIR /app
# COPY package*.json vite.config.ts ./
# RUN npm ci
# COPY src/ src/
# RUN npm run build

# FROM nginx:lts-alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
