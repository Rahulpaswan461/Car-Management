const { default: mongoose } = require("mongoose");
const Car = require("../models/car");

// Controller function to create a new car product
async function createProduct(req, res) {
    try {
        const { title, description, images, tags } = req.body;

        // Check if required fields are missing
        if (!title || !description || !tags) {
            return res.status(400).json({ error: "Incomplete Information !!" });
        }

        // Create a new car instance and save it
        let car = new Car({
            title: title,
            description: description,
            images: images,
            tags: tags,
            createdBy: req.user._id // User who is creating the car product
        });

        car = await car.save();

        // If no car is created, return an error
        if (!car) {
            return res.status(400).json({ error: "No car is created !!" });
        }

        // Return the created car details as response
        return res.status(200).json(car);
    } catch (error) {
        console.log("There is some error", error.message);
        return res.status(500).json({ error: "Internal Server Error !!" });
    }
}

// Controller function to get all cars for the authenticated user
async function getAllCarsForAuthenticateUser(req, res) {
    try {
        const cars = await Car.find({ createdBy: req.user._id });

        // If no cars are found for the user, return an error
        if (!cars) {
            return res.status(400).json({ error: "No information is present for current user !!" });
        }

        // Return the cars found for the user
        return res.status(200).json(cars);
    } catch (error) {
        console.log("There is some error", error.message);
        return res.status(500).json({ error: "Internal Server Error : " });
    }
}

// Controller function to get individual car details by car ID
async function getIndividualCarDetails(req, res) {
    try {
        // Validate car ID format
        if (!mongoose.isValidObjectId(req.params.car_id)) {
            return res.status(400).json({ error: "Invalid car id !!" });
        }

        // Find the car by ID
        const car = await Car.findById(req.params.car_id);

        // If the car is not found, return an error
        if (!car) {
            return res.status(400).json({ error: "No car is there with the given id : " });
        }

        // Return the car details
        return res.status(200).json(car);
    } catch (error) {
        console.log("There is some error", error.message);
        return res.status(500).json({ error: "Internal Server Error : " });
    }
}

// Controller function to update car information by car ID
async function updateCarInformation(req, res) {
    try {
        // Validate car ID format
        if (!mongoose.isValidObjectId(req.params.car_id)) {
            return res.status(400).json({ error: "Invalid car id !!" });
        }

        const { title, description, tags } = req.body;

        // Find and update car information
        const car = await Car.findByIdAndUpdate(req.params.car_id, {
            title: title,
            description: description,
            tags: tags
        }, { new: true });

        // If the car is not found, return an error
        if (!car) {
            return res.status(400).json({ error: "No car is there with the given id : " });
        }

        // Return the updated car details
        return res.status(200).json(car);
    } catch (error) {
        console.log("There is some error", error.message);
        return res.status(500).json({ error: "Internal Server Error : " });
    }
}

// Controller function to delete car information by car ID
async function deleteCarInformation(req, res) {
    try {
        // Validate car ID format
        if (!mongoose.isValidObjectId(req.params.car_id)) {
            return res.status(400).json({ error: "Invalid car id !!" });
        }

        // Find and delete the car by ID
        const car = await Car.findByIdAndDelete(req.params.car_id);

        // If the car is not found, return an error
        if (!car) {
            return res.status(400).json({ error: "No car is there with the given id : " });
        }

        // Return success message after deletion
        return res.status(200).json({ message: "Information deleted successfully !!" });
    } catch (error) {
        console.log("There is some error", error.message);
        return res.status(500).json({ error: "Internal Server Error : " });
    }
}

// Controller function to search cars by title, description, or tags
async function searchTheCar(req, res) {
    try {
        const { query } = req.query;

        // Search cars based on query string in title, description, or tags
        const cars = await Car.find({
            createdBy: req.user._id,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { 'tags.carType': { $regex: query, $options: 'i' } },
                { 'tags.company': { $regex: query, $options: 'i' } }
            ]
        });

        // Return the cars that match the search query
        return res.status(200).json(cars);
    } catch (error) {
        console.log("There is some error", error.message);
        return res.status(500).json({ error: "Internal Server Error : " });
    }
}

// Controller function to upload images for a car
async function uploadImages(req, res) {
    try {
        // Validate car ID format
        if (!mongoose.isValidObjectId(req.params.car_id)) {
            return res.status(400).json({ error: "Invalid car id !!" });
        }

        const files = req.files;

        // Set base path for uploaded images
        const basepath = `${req.protocol}://${req.get('host')}/public/upload/`;

        let imagesPath = [];
        // If files are uploaded, create image paths
        if (files) {
            files.forEach(file => {
                imagesPath.push(`${basepath}${file.filename}`);
            });
        }

        // Find and update the car with the uploaded image paths
        const car = await Car.findByIdAndUpdate(req.params.car_id, {
            images: imagesPath
        }, { new: true });

        if (!car) {
            return res.status(400).json({ error: "No car is present with the given id  !!" });
        }
        
        // Save the updated car instance
        await car.save();


       

        // Return the updated car with images
        return res.status(200).json(car);
    } catch (error) {
        console.log("There is some error", error.message);
        return res.status(500).json({ error: "Internal Server Error : " });
    }
}

module.exports = {
    createProduct,
    getAllCarsForAuthenticateUser,
    getIndividualCarDetails,
    updateCarInformation,
    deleteCarInformation,
    searchTheCar,
    uploadImages
};
