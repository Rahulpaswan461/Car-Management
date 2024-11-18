const User = require("../models/user");

/**
 * Handles user signup by creating a new user record in the database.
 */
async function handleSignupUser(req, res) {
    try {
        // Destructure data from request body
        const { name, email, password } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Incomplete Information !!" });
        }

        // Create new user instance
        const user = new User({
            name: name,
            email: email,
            password: password
        });

        // Save user to the database
        await user.save();

        // Send success response with the created user
        return res.status(201).json({success:"User Created Successfully !!"});
    } catch (error) {
        console.log("There is some error", error.message);
        return res.status(500).json({ error: "Internal Server Error !!" });
    }
}

/**
 * Handles user login by validating credentials and generating a token.
 */
async function loginUser(req, res) {
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;

        // Check if both fields are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Incomplete Information !!" });
        }

        // Generate token by validating the user credentials
        const token = await User.matchPasswordAndGenerateToken(email, password);

        // If token is not generated, return error
        if (!token) {
            return res.status(400).json({ error: "Invalid credentials !!" });
        }

        // Set the token as a cookie and send it as the response
        return res.cookie("token", token).status(200).json({success:"User login in successfully !!"})
    } catch (error) {
        console.log("There is some error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    handleSignupUser,
    loginUser
};
