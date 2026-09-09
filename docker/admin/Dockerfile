FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG BUILD_CONFIGURATION=staging
ARG NG_APP_API_BASE_URL=http://localhost:8080/api
ENV BUILD_CONFIGURATION=$BUILD_CONFIGURATION
ENV NG_APP_API_BASE_URL=$NG_APP_API_BASE_URL

RUN npm run build:admin:${BUILD_CONFIGURATION}

FROM nginx:1.27-alpine

COPY docker/nginx/admin.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/admin/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
