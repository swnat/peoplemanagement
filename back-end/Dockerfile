FROM openjdk:8
FROM maven:3.3-jdk-8
#ADD target/ppl-server-0.1.2.jar application.jar
#RUN bash -c 'touch /application.jar'
#ENTRYPOINT ["java", "-jar", "application.jar"]
RUN mkdir back-end
WORKDIR /back-end
COPY . /back-end/
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]

