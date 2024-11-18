const express = require("express");
const { 
    createProduct, 
    getAllCarsForAuthenticateUser,
    getIndividualCarDetails, 
    updateCarInformation,
    deleteCarInformation, 
    searchTheCar, 
    uploadImages 
} = require("../controllers/car");

const multer = require("multer");

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
};

const router = express.Router();

// Setup multer storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("Invalid image format!");
        if (isValid) uploadError = null;
        cb(uploadError, 'public/upload');
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${filename}`);
    }
});

const upload = multer({ storage });

// Define routes
router.post("/create", createProduct);
router.get("/get-all", getAllCarsForAuthenticateUser);
router.get("/search", searchTheCar);
router.get("/get/:car_id", getIndividualCarDetails);
router.patch("/update/:car_id", updateCarInformation);
router.delete("/delete/:car_id", deleteCarInformation);
router.patch("/upload/images-data/:car_id", upload.array('images', 10), uploadImages);

module.exports = router;
