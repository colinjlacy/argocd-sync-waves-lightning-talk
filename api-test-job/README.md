# Test Phase Job

This job is responsible for running the tests for the project.

## Job Description

First it clears ad seeds the database directly with seed data. Then it runs the tests against the deployed service API to ensure that the API behaves as expected.

## Environment Variables

- `SERVICE_PROTO`: The protocol of the service API. Default is `http`.
- `SERVICE_HOST`: The host of the service API. Default is `localhost:8084`.
- `MYSQL_HOST`: The host of the MySQL database. Default is `localhost`.
- `MYSQL_USER`: The user of the MySQL database. Default is `root`.
- `MYSQL_PASSWORD`: The password of the MySQL database. Default is `password`.