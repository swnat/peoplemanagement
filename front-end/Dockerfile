FROM node:10.19-jessie
RUN mkdir front-end
WORKDIR /front-end
COPY package*.json /front-end/
RUN npm install 
COPY . /front-end/
EXPOSE 4200
CMD ["npm", "run", "prueba"]

