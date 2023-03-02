import React, { useState } from "react";
import axios from "axios";

function ReportLostPet({ petId }) {
  const [lastSeenLocation, setLastSeenLocation] = useState("");

  const handleReportLost = async () => {
    try {
      await axios.patch(`/api/pets/${petId}/reportLost`, {
        lastSeenLocation,
      });
      setLastSeenLocation("");
      // You could also update the state of your component or redirect the user to a new page here
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Report lost pet</h3>
      <label htmlFor="lastSeenLocation">Last seen location:</label>
      <input
        type="text"
        id="lastSeenLocation"
        value={lastSeenLocation}
        onChange={(e) => setLastSeenLocation(e.target.value)}
      />
      <button onClick={handleReportLost}>Report Lost</button>
    </div>
  );
}

export default ReportLostPet;