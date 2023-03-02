// const Pet = require("../models/Pet");
// const User = require("../models/User");
// const Location = require("../models/Location");

// module.exports = {
//   //the createPet function is called when the user submits the form to create a new pet
//   async createPet(req, res) {
//     try {
//       const {
//         name,
//         type,
//         description,
//         breed,
//         age,
//         gender,
//         size,
//         color,
//         friendly,
//         health,
//         notes,
//         userId,
//       } = req.body;
//       const dbPet = await Pet.create({
//         name,
//         type,
//         description,
//         breed,
//         age,
//         gender,
//         size,
//         color,
//         friendly,
//         health,
//         notes,
//         ownerId: userId,
//       });
//       const dbUser = await User.findByIdAndUpdate(
//         { _id: userId },
//         { $push: { pets: dbPet._id } }
//       );

//       res.status(200).json(`dbPet: ${dbPet} dbUser: ${dbUser}`);

//     } catch (error) {
//       console.log(error);
//       res.status(500).json(error);
//     }
//   },

//   async getPets(req, res) {
//     try {
//       const dbPets = await Pet.find({});
//       res.status(200).json(dbPets);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   },

//   async getPet(req, res) {
//     try {
//       const dbPet = await Pet.findById(req.params.id);
//       res.status(200).json(dbPet);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   },
// //the get
//   async getOwnersPets(req, res) {
//     const { _id } = req.params;
//     try {
//       const dbPets = await Pet.find({ ownerId: _id });
//       console.log(dbPets);
//     } catch (error) {}
//   },

//   async getOwnersPets(req, res) {
//     const { _id } = req.params;
//     try {
//       const dbPets = await Pet.find({ ownerId: _id });
//       console.log(dbPets);
//     } catch (error) {}
//   },

//   async updatePet(req, res) {
//     try {
//       const {
//         name,
//         type,
//         description,
//         breed,
//         age,
//         gender,
//         size,
//         color,
//         friendly,
//         health,
//         notes,
//       } = req.body;
//       const dbPet = await Pet.findByIdAndUpdate(
//         req.params.id,
//         {
//           name,
//           type,
//           description,
//           breed,
//           age,
//           gender,
//           size,
//           color,
//           friendly,
//           health,
//           notes,
//         },
//         { new: true }
//       );
//       res.status(200).json(dbPet);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   },
//   async removePet(req, res) {
//     try {
//       const dbPet = await Pet.findByIdAndDelete(req.params.id);
//       res.status(200).json({ message: "Pet deleted" });
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   },

//   async reportLostPet(req, res) {
//     try {
//       const { lastSeenLocation } = req.body;
//       const dbPet = await Pet.findByIdAndUpdate(
//         req.params.id,
//         {
//           lost: true,
//           lastSeenLocation,
//         },
//         { new: true }
//       );
//       res.status(200).json(dbPet);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   },


// };
const Pet = require("../models/Pet");
const User = require("../models/User");
const Location = require("../models/Location");

module.exports = {
  //the createPet function is called when the user submits the form to create a new pet
  async createPet(req, res) {
    try {
      const {
        name,
        type,
        description,
        breed,
        age,
        gender,
        size,
        color,
        friendly,
        health,
        notes,
        userId,
      } = req.body;
      const dbPet = await Pet.create({
        name,
        type,
        description,
        breed,
        age,
        gender,
        size,
        color,
        friendly,
        health,
        notes,
        ownerId: userId,
      });
      const dbUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { pets: dbPet._id } }
      );
      res.status(200).json(`dbPet: ${dbPet} dbUser: ${dbUser}`);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async getPets(req, res) {
    try {
      const dbPets = await Pet.find({});
      res.status(200).json(dbPets);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getPet(req, res) {
    try {
      const dbPet = await Pet.findById(req.params.id);
      res.status(200).json(dbPet);
    } catch (error) {
      res.status(500).json(error);
    }
  },
//the get
  async getOwnersPets(req, res) {
    const { _id } = req.params;
    try {
      const dbPets = await Pet.find({ ownerId: _id });
      console.log(dbPets);
    } catch (error) {}
  },

  async updatePet(req, res) {
    try {
      const {
        name,
        type,
        description,
        breed,
        age,
        gender,
        size,
        color,
        friendly,
        health,
        notes,
      } = req.body;
      const dbPet = await Pet.findByIdAndUpdate(
        req.params.id,
        {
          name,
          type,
          description,
          breed,
          age,
          gender,
          size,
          color,
          friendly,
          health,
          notes,
        },
        { new: true }
      );
      res.status(200).json(dbPet);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async removePet(req, res) {
    try {
      const dbPet = await Pet.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Pet deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async reportLostPet(req, res) {
    try {
      const { lastSeenLocation } = req.body;
      const dbPet = await Pet.findByIdAndUpdate(
        req.params.id,
        {
          lost: true,
          lastSeenLocation,
        },
        { new: true }
      );
      res.status(200).json(dbPet);
    } catch (error) {
      res.status(500).json(error);
    }
  },


};