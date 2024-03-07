const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    type: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: String,
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true,
    }
})

//pre() method in Mongoose Schema API is used to add a pre-hook to the mongoose Schema methods
personSchema.pre('save', async function (next) {
    //before save action do this
    const person = this
    //hash the password only if it has been modified (or it is new)
    //isModified function in Mongoose is used to check if a field in a document has been modified since it was last saved to the database.
    if (!person.isModified('password')) return next()
    try {
        /* hash password generation */
        // salt generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt)

        //override the plain passowrd with the hashed one
        person.password = hashedPassword
        next()
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = bcrypt.compare(candidatePassword, this.password);
        return isMatch
        /* process of mathcing 
            ved --> asdfajdfhkahdshfkahdfahdkfjhadkshf
            login --> test

            first extracting salt from saved password
            asdfajdfhkahdshfkahdfahdkfjhadkshf --> extract salt
            salt + test --> hash --> wedasfasdfjakjsdhfkjahdshaksjdfhkadh
            and comapring both hashes
        */
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema)
module.exports = Person