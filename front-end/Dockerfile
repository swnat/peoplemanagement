FROM node:10.19-jessie
RUN mkdir people-management
WORKDIR /people-management
COPY package*.json /people-management/
RUN npm install 
COPY . /people-management/
EXPOSE 4200
CMD ["npm", "run", "prueba"]

