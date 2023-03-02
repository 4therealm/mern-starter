// // Location controller routes
// const Location = require('../models/Location');

// module.exports = {
//   async createLocation(req, res) {
//     try {
//       const { location, coordinates, city, state } = req.body;
//       const dbLocation = await Location.create({ location, coordinates, city, state });
//       res.status(200).json(dbLocation);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   },
  

//   async getLocations(req, res) {
//     try {
//       const dbLocations = await Location.find({});
//       res.status(200).json(dbLocations);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   },

//   async getLocation(req, res) {
//     try {
//       const { id } = req.params;
//       const dbLocation = await Location.findById(id)
//       .populate({
//         path: 'pets',
//         populate: { path: 'owner' }
//       });
//       const userPetList = [];
//       dbLocation.pets.forEach(pet => {
//         const owner = pet.owner;
//         if (userPetList.findIndex(user => user._id.toString() === owner._id.toString()) === -1) {
//           userPetList.push(owner);
//         }
//       });
//       res.status(200).json(userPetList);
//       res.status(200).json(dbLocation);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   },
//   async GeospatialTest(req, res) {
//     try {
//       const { lat, lng, radius } = req.query;
  
//       // Define the location point and radius for the query
//       const location = {
//         type: 'Point',
//         coordinates: [parseFloat(lng), parseFloat(lat)],
//       };
//       const distance = parseInt(radius) * 1000; // Convert to meters
  
//       // Find all locations within the given radius of the location
//       const dbLocations = await Location.find({
//         coordinates: {
//           $near: {
//             $geometry: location,
//             $maxDistance: distance,
//           },
//         },
//       }).select('city state');
  
//       const nearbyTowns = dbLocations.map((location) => ({
//         city: location.city,
//         state: location.state,
//       }));
  
//       res.status(200).json(nearbyTowns);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   },
//   async updateLocation(req, res) {
// try {
//   const { id } = req.params;
//   const { location } = req.body;
// const dbLocation = await Location.findById(id);
// dbLocation.location = location;
// await dbLocation.save();
// res.status(200).json(dbLocation);

// } catch (error) {
//   res.status(500).json(error);
//   }
// },
// async removeLocation(req, res) {
//   try {
//     const { id } = req.params;
//     const dbLocation = await Location.findByIdAndDelete(id);
//     res.status(200).json({message: 'Location deleted'});
//   } catch (error) {
//     res.status(500).json(error);
//   }
// },

// async findLostPetsNearLocation(req, res) {
//   const { lat, lng, radius } = req.query;

//   // Define the location point and radius for the query
//   const location = {
//     type: "Point",
//     coordinates: [parseFloat(lng), parseFloat(lat)],
//   };
//   const distance = parseInt(radius) * 1000; // Convert to meters

//   try {
//     // Find all lost pets within the given radius of the location
//     const dbPets = await Pet.find({
//       isLost: true,
//       location: {
//         $near: {
//           $geometry: location,
//           $maxDistance: distance,
//         },
//       },
//     }).populate("owner");

//     res.status(200).json(dbPets);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// },

// }

// Location controller routes
const Location = require('../models/Location');

module.exports = {
  async createLocation(req, res) {
    try {
      const { location, coordinates } = req.body;
      const dbLocation = await Location.create({ location, coordinates });
      res.status(200).json(dbLocation);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  

  async getLocations(req, res) {
    try {
      const dbLocations = await Location.find({});
      res.status(200).json(dbLocations);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getLocation(req, res) {
    try {
      const { id } = req.params;
      const dbLocation = await Location.findById(id).populate('pets');
      dbLocation.pets.forEach(pet => {
        console.log(pet.name);
      });
      res.status(200).json(dbLocation);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async updateLocation(req, res) {
try {
  const { id } = req.params;
  const { location } = req.body;
const dbLocation = await Location.findById(id);
dbLocation.location = location;
await dbLocation.save();
res.status(200).json(dbLocation);

} catch (error) {
  res.status(500).json(error);
  }
},
async removeLocation(req, res) {
  try {
    const { id } = req.params;
    const dbLocation = await Location.findByIdAndDelete(id);
    res.status(200).json({message: 'Location deleted'});
  } catch (error) {
    res.status(500).json(error);
  }
}

}