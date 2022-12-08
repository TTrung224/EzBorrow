//this file aimed to store common functions
const User = require("../model/account");


const fineSet = async (fineMessage, fineDes, userEmail) => {
    try {
        let userFine = await User.findOne({email: userEmail}, 'fine fineDescription');
        if (!userFine) {
            throw new Error('userNotFindError');
            // res.status(400).json({success: false, message: 'cannot find this user'})
        }
        console.log(userFine);

        userFine.fine = fineMessage;
        userFine.fineDescription = fineDes;
        userFine.save();
        console.log(userFine);
        return 'success'
        // res.status(200).json({success: true, message: `fine of user ${userEmail} is set`})
    } catch (error) {
        if (error.message === 'userNotFindError') throw error
        else {
            console.log(error)
            throw new Error('fineMessageError')}
        // res.status(400).json({success: false, message: 'unallowed fine message'})
    }
};

let fineReset = async (userEmail) => {
    try {
        
        let userFine = await User.findOne({email: userEmail}, 'fine fineDescription');
        if (!userFine) {
            throw new Error('userNotFindError');
        }
        userFine.fine = 'NONE';
        userFine.fineDescription = 'NONE';
        userFine.save();
        return 'success'
    } catch (error) {
        if (error.message === 'userNotFindError') throw error
        throw error;
    }
};

module.exports = {fineReset, fineSet};