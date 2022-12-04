# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Deliverables

New and updated routes

Admin - localhost:8083
- `/admin/investments/:id` GET an investment record by id using the admin service
- `/admin/users/report` POST user holdings report to /investments/export route

 How to run any additional scripts or tests

- to run test (admin/src/test/index.test.js)
- run `npm start` in both the 'investments' and 'financial-companies' service
- run `npm run test` in the 'admin' service

How might you make this service more secure?

- I observed that there were deprecated files from packages such as "request", as deprecation warnings included; har-validator@5.- 1.5; uuid@3.4.0.
- Instead I used "axios" (promise-based HTTP Client for node.js). 
- I also run npm audit fix and subsequently npm audit fix, as there were 9 vulnerabilities (5 moderate, 3 high, 1 critical) at the time.
- I would add structured logging in json format throughout the services, so warning and error messages can be identified e.g. through AWS cloudwatch, hence providing metrics and the opportunity to triage and investigate issues
- I would implement authorization for api requests and for data; for example, to allow verified admin users only to make request. Time sensitive JSON Web Tokens could be used which would increase security and auditing as the persons making requests could be identified.
- Middleware could be used to check authentication
- Typescript could be used to ensure the precise defining of types hence inputted data
- Testing pipelines can be used to ensure expected data is received from requests
- Currently data is stored in json files. Databases could be used to store data more securely.
- All error messages that could expose information to hackers would need to be removed
- Improved error-handling for all services

How would you make this solution scale to millions of records?

- In the index.js files bodyParser uses the option of limit: "10mb". As the volume of data increases the number of bytes will need to be increased.
- Using a database such as AWS DynamoDB, the resources required, could scale with the demands when configured to do so
- The data organization in the 'investments' service could be improved. For example, multiple objects of information from the same user (firstName and lastName) is stored. Duplication could be limited with improved organization and the use of a database 
- Currently the /investments route queries all the data. An improved solution could involve to store and query only the data that is required. GraphQL could be used instead of REST; with GraphQL over-fetching is prevented and only received is the data you explicitly requested. 
- It may not be optimal to post the csvReport to another service i.e. admin service to investments service. The desired functionality of the investments/export route could be done within the same service

What else would you have liked to improve given more time?

- I used an API testing tool to manually test all the routes and ensure that expected data was received; I also run all the services locally and observed the terminal logs to test the requests
- I would add more unit test cases to automate the testing
- Ramda.js package could be used in the solution for more functional programming and side-effect free functions
- Ramda strives for performance so this would also increase the efficiency of the code
- Before coding I spent time planning the solution including what API calls would need to be used and understanding the existing data, hence breaking down the solution based on the requirements
- Further time could be used researching and optimising the packages used and production deployment considerations, overall taking into account the long-term goals of the Moneyhub investments and holdings admin tool

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the csv report to be sent as json
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id
