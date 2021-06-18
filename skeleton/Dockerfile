# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY . .

# install node modules and build assets
RUN yarn install && yarn build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /app
# Remove default nginx static assets
RUN rm -rf ./* && rm -rf /etc/nginx/conf.d

COPY ./nginx /etc/nginx

# Copy static assets from builder stage
COPY --from=build-stage /app/dist ./dist

EXPOSE 80
EXPOSE 443

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]