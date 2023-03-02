import { useState, useEffect } from "react";
import PetList from "../components/PetList";
import AddPetForm from "./Forms/AddPetForm";
import axios from "axios";

const Dashboard = (props) => {
  // console.log(props);
// console.log(props.userId, props.isLoggedIn, props.userLocation.address_components[2].long_name, )

  const [showForm, setShowForm] = useState(false);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getPetList = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/pets`);
        setPets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPetList();
  }, []);


    

  const handleAddPet = (newPet) => {
    setPets([...pets, newPet]);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const checkUser = () => {
    if (props.userId) {
      console.log(props.userId);
    }
  };

  return (
    <div className="container-fluid">
      <h1>Dashboard</h1>
      <PetList petList={pets} />
      <button onClick={checkUser}>Check User</button>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add Pet</button>
      )}
      {showForm && (
        <AddPetForm
          handleAddPet={handleAddPet}
          setShowForm={setShowForm}
          handleCancel={handleCancel}
          userId={props.userId}
          setPets={setPets}
        />
      )}
    </div>
  );
};

export default Dashboard;