const today = new Date().toISOString().slice(0,10);
const fistDayOfMonth = today.slice(0,8).concat('01');

const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fistDayOfMonth}&end_date=${fistDayOfMonth}&api_key=hsDSy2E5Oz9eUPxbvPuAnaAi8w3pIUCJtDiuhg1N`

export function fetchAsteroids(url= API_URL) {
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

