FROM node:20-alpine as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye el proyecto
RUN npm run build

# Etapa de producción con NGINX
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior al directorio predeterminado de NGINX
COPY --from=build /app/dist/finanzas-front/browser /usr/share/nginx/html

# Expone el puerto 80 para el servidor web
EXPOSE 80

# Configura el comando de inicio del contenedor
CMD ["nginx", "-g", "daemon off;"]
