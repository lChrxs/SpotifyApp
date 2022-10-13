#Nombre de la imagen
FROM nginx:1.21.6-alpine
#Copia el archivo default a la maquina virtual
COPY default.conf /etc/nginx/conf.d/
# Run ejecuta un comando del shell
RUN rm -rf /usr/share/nginx/app/*
#Agrega lo que esta dentro de dist a la ruta
ADD dist /usr/share/nginx/app
#Cambia los permisos del archivo a solo lectura
RUN chmod 777 -R /usr/share/nginx/app
#RUN se hace cuando se esta construyendo el docker, CMD lo guarda para cuando termia de crear la maquina virtual, es lo ultimo que se va a ejecutar
CMD ["nginx", "-g", "daemon off;"]