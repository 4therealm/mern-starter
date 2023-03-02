import React, { useState } from "react";
import axios from "axios";

const PetAside = ({ petList }) => {
  // this is the state that will hold the pet id of the pet that was clicked
  const [selectedPet, setSelectedPet] = useState(null);
  // this is the state that will hold the boolean value for the modal
  const [modalVisible, setModalVisible] = useState(false);
  // this is the state that will hold the pet info
  const [petInfo, setPetInfo] = useState({});

  const handleButtonClick = async (petId) => {
    console.log(petId);
    try {
      // this is the axios call to get the pet info
      const response = await axios.get(`/api/pets/${petId}`);
      console.table(response.data);
      // this sets the petInfo state to the response data
      setPetInfo(response.data);
      // this sets the selectedPet state to the petId
      setSelectedPet(petId);
      // this sets the modalVisible state to true
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
// this function handles the closing of the modal
  const handleModalClose = () => {
    // this sets the selectedPet state to null
    setSelectedPet(null);
    setModalVisible(false);
  };

  return (
    <aside>
      <h2>Pet List</h2>
      <div className="btn-group-vertical">
        {petList.map((pet) => (
          <button
            key={pet._id}
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleButtonClick(pet._id)}
          >
            {pet.name}
          </button>
        ))}
      </div>
      {modalVisible === true && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{display: "block"}} >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{petInfo.name}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Type: {petInfo.type}</p>
                <p>Breed: {petInfo.breed}</p>
                <p>Gender: {petInfo.gender}</p>
                <p>Age: {petInfo.age}</p>
                <p>Size: {petInfo.size}</p>
                <p>Color: {petInfo.color}</p>
                <p>Friendly: {petInfo.friendly ? "Yes" : "No"}</p>
                <p>Health: {petInfo.health}</p>
                <p>Notes: {petInfo.notes}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default PetAside;