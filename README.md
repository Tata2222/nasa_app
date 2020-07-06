This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Nasa_app

[DEMO LINK](https://Tata2222.github.io/nasa_app/)

Interview task
Requirements:
- use React, Redux, Redux-Saga, TypeScript
-  use best practices to structure the application, consider that it will be extended with additional features in the future
- provide means for configuration for different environments (DEV/PROD)
- cover partially with unit tests (in order to demonstrate the approaches, if have experience)
- use api.nasa.gov
- the API-KEY please register
- documentation:
https://api.nasa.gov  (part - Asteroids - NeoWs)
You should start whit clear repo on github, use Gitflow and after done, use gitpages to submit this task for verification
Task:
Create a single page React application with information about near orbital objects (NEO), organized in list with a maximum of 6 elements. New element should be added every 5 seconds and contain aggregated data about a single day. The oldest element should be removed on new element if list is full. You should start fetching data from 1st day of the month till today. When reach today, start from the 1st day again.
Every element should contain the following data:
- max estimated diameter of NEO in kilometers for the day (check estimated_diameter_max property)
- number of potentially hazardous NEOs per day (check is_potentially_hazardous_asteroid property)
- closest NEO (miss_distance in km)
- fastest NEO (relative_velocity in kph)
Elements with the 2 highest numbers of hazard objects should have red background and updated with each new element added.
