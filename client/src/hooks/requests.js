const API_URL = "http://localhost:8000/v1";

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);
  const planets = await response.json();

  return planets;
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.

  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  const launches = fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });

  return launches;
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try {
    const data = JSON.stringify(launch);
    const fetchOptions = {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${API_URL}/launches`, fetchOptions);

    //  This returns the response interface( or the response object). See the response interface to know how you can manage the data
    return response;
  } catch (err) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.

  try {
    const fetchOptions = {
      method: "delete",
    };
    const response = await fetch(`${API_URL}/launches/${id}`, fetchOptions);

    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
