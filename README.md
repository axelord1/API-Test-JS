# API-Test-JS
API Testing project challenge using Javascript-NodeJS-FrisbyJS-JasmineNode

STEPS TO RUN API TESTS
1. Clone Repository to your local computer: https://github.com/axelord1/API-Test-Java.git
2. Install latest Nodejs javascript runtime: https://nodejs.org/en/
3. At your root folder(API-Test-JS) install node packages:
    a) npm install --save-dev frisby
    b) npm install --save-dev jest
4. To run your tests, open a Terminal or console window, and from the root folder of your project type: jest

**PROBLEM 1**
API Test Cases for https://images-api.nasa.gov/search endpoint (GET request)
***valid scenarios***
1. valid text search parameter without authentication
2. valid authentication and text search parameter
2. valid authentication and nasaID search parameter
***invalid scenarios***
1. invalid authentication and search parameters
2. invalid nasaID with authentication(unexpected issue:The response expected expected obtained through postman is different what is obtaining through frisby)

**PROBLEM 2**
These are my observations/strategies given the next 2 requirements:
API Key restrictions:
- If the api_key is not passed with the request, then the user will get an HTTP 403 Forbidden error code. 
R: currently the API authentication requests are not working as expected as it doesnt matter if a search is performed with or without the api_key, we are currently receiving responses with HTTP status code 200.
- The api_key enforces a limit of 1000 API requests per hour.
R: my strategy would be to run performance testing using either JMeter or MicroFocus(past owner HP) Loadrunner using REST communication protocol scripting and running the common subset of performance testing types with its intended scenarios:
load test: 
    sustained ramp up of requests per second to assess and validate if the breakpoint occur when expected(1000 API requests per hour).
stress test:
    higher sustained input of load above the average to verify how fast the breakpoint is reached and emulate the behavior for when the API is under abnormal workload.
spike test:
    scenario that simulates a sudden spike of load on a very short time to verify the behavior of the API.
endurance test:
    balanced input of load that would run for 4 to 8 hours always reaching a number right below the 1000 API requests per hour to verify if the API is able to keep workig as expected working right below its limits avoiding subsequent bottlenecks.