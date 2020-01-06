# People Management
Human resources recruitment monitoring system. It enables record keeping for candidates interviews and technical challenges.\
For this we model the interview and challenge processes with Flowable BPM. We use the Flowable Engine Library.

![Arquitacture](https://i.imgur.com/f1wtpJY.jpg)
## Installation
You need to install JDK 8 
```bash
sudo apt install openjdk-8-jdk
```
You must also have Postgresql installed and create a Database with the name `swnat` and a schema `management`. The username and password shoud be `postgres`. You can change this in `pm-server/src/main/resources/application.yml`  

Run the spring boot application.
```bash
mvn spring-boot:run
```
## Running JUnit tests
Use the next command to run the JUnit tests
```bash
mvn test
```

## Access to the services of the application 
[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### Authentication
On the Swagger page, there is an authentication controller (auth-controller). This returns an `accessToken` and a `tokenType` when authenticating.

The `accessToken` is used to authorize services. Therefore, we must place it in the `value` field of authorization as follows:
```bash
Bearer accessToken
```
With a space between Bearer (with uppercase B) and the token.

**Example:**
 
`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwic2NvcGVzIjoiUk9MRV9BRE1JTiIsImlhdCI6MTU0NzE0NDg5MiwiZXhwIjoxNTUyMTkyODkyfQ.IVDrqPj_CmOQnK5VDRSALPKnYMraKpBGXDDoPwNbhkGInw0v0Kki4sK7D5xbN3U03iVBsFJj1SbwMnMkISibMQ`


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
