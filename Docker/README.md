# PeopleManagement Docker Image
The purpose of this is to deploy the entire project on a docker image, so that others developed do not have problems in wanting to raise the whole project in their local environment, which makes it multiplatform.
If you do not have Docker installed, please visit the [Docker documentation](https://docs.docker.com/) and follow the steps for installation. 

## Building the image of people-management
To build the full image of the project go to the Docker directory and run:
```bash
sudo docker-compose up
```

## Build images separately

To build the front-end image, go to the front-end directory and run the following: 
```bash
sudo docker build -t frontEnd .
sudo docker run -d -p 4200:4200 frontEnd
```
To build the backend image, go to the backend directory and execute the following: 
```bash
sudo docker build -t BackEnd .
sudo docker run -d -p 8080:8080 BackEnd
```

```
Note:
In order to build the backend image it is recommended that the postgres image is built first, if this is not the case it is necessary to build the postgresql image manually.
```

## Reference commands 

With this command you can view the images you currently have: 
```bash
sudo docker images
```
To visualize the containers that are active: 
```bash
sudo docker ps 
```
To display the containers that are inactive:
```bash
sudo docker ps -a
```