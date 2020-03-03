FROM openjdk:8
ADD target/ppl-server-0.1.2.jar application.jar
RUN touch /application.jar
ENTRYPOINT ["java", "-jar", "application.jar"]

