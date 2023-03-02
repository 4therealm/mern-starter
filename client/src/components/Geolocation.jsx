
import React, { useState } from "react";
import axios from "axios";

export default function GeoLocation(props) {
  const [coords, setCoords] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const [locationData, setLocationData] = useState(null);

  const [searchValue, setSearchValue] = useState("");
// the function that gets the user's location
  const getLocation = () => {
    // if the navigator.geolocation object is supported on your browser
    if (navigator.geolocation) {
      // call getCurrentPosition() method to get the coordinates
      navigator.geolocation.getCurrentPosition(
        // define a callback function to receive the coordinates
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
          //the coordinates are in the coords property of the position object
          // console.log(coords.latitude, coords.longitude);
          getLocationData(`${coords.latitude},${coords.longitude}`);
          // the getLocationData function is called with the coordinates as the argument
          
        },
        (error) => {
          setCoords({ ...coords, error: error.message });
        }
      );
    } else {
      setCoords({ ...coords, error: "Geolocation is not supported" });
    }
  };
// the function that gets the location data from the coordinates/zip/name
  const getLocationData = async (location) => {
    console.log(location);
    // Check if the location is coordinates
    const isCoordinates = location.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
    // Check if the location is a zip code
    const isZip = location.match(/^\d{5}(?:[-\s]\d{4})?$/);
    // Set the address variable to the user input if it's not coordinates or zip
    let address = location;
    if (isCoordinates) {
      // Extract the latitude and longitude from the coordinates
      const [latitude, longitude] = location.split(",");
      // Set the address to the coordinates
      address = `${latitude},${longitude}`;
    } else if (isZip) {
      // Set the address to the zip code
      address = location;
    } else {
      address = encodeURIComponent(location);
    }
  
    const options = {
      method: "GET",
      url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json",
      params: { address, language: "en" },
      headers: {
        "X-RapidAPI-Key": "b6a308ea18msh6870fa17d267db8p158239jsn25a211e1184a",
        "X-RapidAPI-Host": "google-maps-geocoding.p.rapidapi.com",
      },
    };
  
    try {
      // Make the request to the Google Maps Geocoding API
      const response = await axios.request(options);
      // Set the location data to the response data
      setLocationData(response.data.results[0]);
      // console.log(response.data.results[0])
      // props.setUserLocation is a function that sets the userLocation state in the App component
      props.setUserLocation(response.data.results[0]);
      console.log(response.data.results[0])
    } catch (error) {
      console.error(error);
    }
  };
  
// the function that handles the search button
  const handleSearch = () => {
    console.log(searchValue);
    // the getLocationData function is called with the searchValue as the argument
    getLocationData(searchValue);
    setSearchValue("");
  };
  // the function that saves the location to the database
  const saveLocation = async () => {
    // the locationData object is sent to the server
    try {
      const response = await axios.post('/api/locations', {
        location: locationData.formatted_address,
        coordinates:[ locationData.geometry.location.lat, locationData.geometry.location.lng]
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      <button onClick={saveLocation}>Save Location</button>

      {coords.error && <p>{coords.error}</p>}
      {locationData && locationData.address_components && (
        <div>
          {/* <p>City: {locationData.address_components[2].short_name}</p>
          <p>State: {locationData.address_components[4].short_name}</p> */}
          {/* <p>User Location : {props.userLocation}</p> */}
       
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Search Location"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}