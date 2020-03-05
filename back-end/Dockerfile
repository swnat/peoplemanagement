FROM openjdk:8
FROM maven:3.3-jdk-8
RUN mkdir back-end
WORKDIR /back-end
COPY . /back-end/
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]

