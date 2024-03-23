const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');

exports.login = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      
        res.render("layout/header",{user:user})

       
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.findById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render("editUser",{user:user})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.findUsers = async (req, res) => {
    try {
        // You can add any specific criteria for finding users based on your requirements
        const users = await User.find({}); 
        // This will find all users, you can add specific query conditions if needed
        res.render("index",{users:users})
         
    }  catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.signup = async (req, res) => {
    try {
        console.log(req.body);
        const { email , password } = req.body;
         
        const user = new User({ email , password });
        await user.save();
       
        res.render("login")
        
    } catch (error) {
        res.status(400).send(error.message);
    }
};
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { email, password } = req.body;

        // Vérifiez s'il y a des données d'entrée valides pour la mise à jour
        if (!email && !password) {
            return res.status(400).send("Veuillez fournir des données valides pour la mise à jour de l'utilisateur.");
        }

        // Recherchez l'utilisateur dans la base de données
        const user = await User.findByIdAndUpdate(userId);
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé.');
        }

        // Mettez à jour les champs de l'utilisateur si de nouvelles valeurs sont fournies
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }

        // Sauvegardez les modifications dans la base de données
        await user.save();
        const users = await User.find({}); 
        // This will find all users, you can add specific query conditions if needed
        res.render("index",{users:users})
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Recherchez l'utilisateur dans la base de données
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé.');
        }

       
        const users = await User.find({}); 
        // This will find all users, you can add specific query conditions if needed
        res.render("index",{users:users})
 
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.logout = async (req, res) => {
    try {
        // Implement your logout logic here
        // For example, if you're using JWT tokens, you may need to clear the token from client-side storage or invalidate it on the server-side
        // Assuming you're using JWT tokens, you may want to clear the token from client-side storage
        res.clearCookie('jwt');
         
        res.render("layout/headerlo" )
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
