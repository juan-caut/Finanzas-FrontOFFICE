FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/finanzas-front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["ngink", "-g","daemon off;"]