import { useEffect, useState } from 'react'
import axios from 'axios'

const Neighborhood = (props) => {
  const [neighborhoods, setNeighborhoods] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newNeighborhoodName, setNewNeighborhoodName] = useState('')

  // useEffect(() => {

  //   // console.log(props.userLocation.address_components[2])
  //   const getNeighborhoods = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3001/api/locations`)
  //       setNeighborhoods(response.data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getNeighborhoods()
  // }, [])
// useEffect(() => {
//   console.log(props.userLocation.formatted_address)
// }, [props.userLocation])

  const createNeighborhood = async () => {
    console.log(props.userLocation.address_components[2].long_name)
    setNewNeighborhoodName(props.userLocation.formatted_address)

    try {
    
      const response = await axios.post(`/api/locations`, { location: newNeighborhoodName })
      setNeighborhoods([...neighborhoods, response.data])
      setNewNeighborhoodName('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Neighborhood</h1>
          <button onClick={createNeighborhood}>add current location</button>
        </div>
      )}
    //   <ul>
    //     {neighborhoods.map((neighborhood) => (
    //       <li key={neighborhood._id}>
    //         <h2>{neighborhood.name}</h2>
    //         <ul>
    //           {/* List of pets in the neighborhood */}
    //           {/* <li>...</li> */}
    //         </ul>
    //         <ul>
    //           {/* List of users in the neighborhood */}
    //           {/* <li>...</li> */}
    //         </ul>
    //       </li>
    //     ))}
    //   </ul>
    // </div>


export default Neighborhood
