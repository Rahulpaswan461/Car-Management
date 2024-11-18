# Car Management Application (Backend)

This is the backend service for a Car Management Application. It allows users to create, view, edit, and delete cars, along with user authentication. The backend is built using Node.js, 
Express.js, and MongoDB.The API is designed to manage car listings and provide features such asuser authentication and search functionality.

## Features
- User Authentication:
  - Signup: Create a new user account.
  - Login: Authenticate an existing user.
  - User can only manage their own cars.
- Car Management:
  - Create Car: Users can add a new car with up to 10 images, title, description, and tags (car_type, company, dealer).
  - View Cars: Users can view all the cars they have added.
  - Update Car: Users can update the car’s title, description, tags, and images.
  - Delete Car: Users can delete a car from their list.
  - Search Cars: Users can search through their cars based on title, description, or tags.
  
- Product APIs:
  - Create User (POST /api/users/signup)
  - Login User (POST /api/users/login)
  - Create Product (POST /api/cars/create)
  - List Products (GET /api/cars/get-all)
  - Get Product Details (GET /api/cars/get/:car_id) 
  - Update Product (PATCH /api/cars/update/:car_id)
  - Delete Product (DELETE /api/cars/delete/:car_id)
  - Search Cars (GET /api/cars/search)


 
## Table of Contents
- Getting Started
- Environment Variables
- API Endpoints
- Technologies Used
- License

  
## Getting Started
 To get the backend service running on your local machine, follow these instructions.

 ### Prerequisites
 - Node.js (v12 or later)
 - MongoDB
 - Git

   ## Installation
1. Clone the repository:
   git clone https://github.com/Rahulpaswan461/Car-Management
2. Navigate to the project directory:
   cd car-management
3. Install the dependencies:
    npm install
4. Set up the environment variables:
    - JWT_SECRET = your-secret-key
    - PORT = port-number
    - MONGO_URL = your-mongodb-url
5. Start the server:
   npm start

   - The server should now be running on the specified port (from the .env file). You can access the API at http://localhost: port.

     ## Environment Variables

-  In order to run this project, you will need to add the following environment variables to your .env file:

- JWT_SECRET: The secret key used to sign and verify JWT tokens for authentication.
- PORT: The port number on which the server will run (default: 3000 if not specified).
- MONGO_URL: MongoDB connection URL.

  
 ### Example .env file:
- JWT_SECRET=mySuperSecretKey
- PORT=3000
- MONGO_URL=mongodb://localhost:27017/car-management

 ## Technologies Used
 - Node.js: JavaScript runtime used to build the backend API.
 - Express.js: Web framework to handle HTTP requests and routing.
 - MongoDB: NoSQL database used to store user and car data.
 - Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
 - JWT (JSON Web Tokens): For user authentication and authorization.
 - Multer: Middleware for handling multipart/form-data, used for image uploads.

   
