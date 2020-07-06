const today = new Date().toISOString().slice(0,10);
const fistDayOfMonth = today.slice(0,8).concat('01');

const API_URL = `http://api.nasa.gov/neo/rest/v1/feed?start_date=${fistDayOfMonth}&end_date=${fistDayOfMonth}&api_key=hsDSy2E5Oz9eUPxbvPuAnaAi8w3pIUCJtDiuhg1N`

export function fetchAsteroids(url= API_URL) {
  const correctUrl = url.replace('http', 'https');

  return fetch(correctUrl)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

