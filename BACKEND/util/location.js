const axios = require("axios");

const HttpError = require("../models/http-error");

// const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA';
// const API_KEY = "AIzaSyBvY3k2uFCZtMtKH80MVCYqO0OpSt-byRM";
const API_KEY = process.env.GOOGLE_API_KEY; // Ensure you set this in your environment variables

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  console.log(JSON.stringify(data, null, 2));

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
