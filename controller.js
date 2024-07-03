const user = require('./model.js');

// create user functionality
const createUser = async (req, res) => {
try{
    //  pass the required fields in the request body
    const {name, email, age, sex} = req.body
    // check for missing fields
    if(!name | !email | !age | !sex) {
       return res.status(400).json({message:'Missing Required field(s). Must fill all fields'})
    }

    // check if the email already exist
    const emailExist = await user.findOne({email:email.toLowerCase()})
    if(emailExist){
        return res.status(400).json({message:"Email alredy exist"})
    }
    //  create an instance of a user
    const newUser = await user.create({     
        name: name.toUpperCase(),
        email: email.toLowerCase().trim(),
        age,
        sex
    })
    
    await newUser.save()
          // return success response and the new user created
    
    res.status(200).json({ message: 'Successfully created an account', user:newUser})
   

}catch(err){
    // console.err(`Error craeting user ${err}`),
    res.status(500)
    .json({message:`Internal server error ${err}`})

}
}


const retrieveUser = async (req, res) => {
    try{
        // get the user Id from the params
        const {id} = req.params
        const getUser = await user.findById(id)
        //  check if the user is existing in the database
        if(!getUser){
            return res.status(400).json({message:"User does not exist"})
        }else{
          // return success response
            res.status(200).json({messsage:"user", data:getUser})
        }


    }catch(err){
        res.status(500)
        .json({message:`Internal server error ${err}`}) 
    }
}


const getUsers = async (req, res) => {
    try {
      // Extract query parameters
      const { name, email, startAge, endAge } = req.query;
  
      // Build the filter object
      let filter = {};
  
      if (name) {
        filter.name = new RegExp(name, 'i'); 
      }
  
      if (email) {
        filter.email = new RegExp(email, 'i');
      }
  
      if (startAge && endAge) {
        filter.age = { $gte: startAge, $lte: endAge };
      } else if (startAge) {
        filter.age = { $gte: startAge };
      } else if (endAge) {
        filter.age = { $lte: endAge };
      }
  
      // Fetch users from the database based on the filter
      const users = await user.find(filter);
  
      // Send the filtered users as response
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports = {
    createUser,
    retrieveUser,
    getUsers

};