const mongoose = require('mongoose');
const UserModel = require('../../__utils__/userModel');

const userData = {
    name: 'TekLoon',
    gender: 'Male',
    dob: new Date(),        // date of birth
    loginUsing: 'Facebook'
};

describe('User Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(
            "mongodb://localhost:27017/yapp-db",
            { 
                useNewUrlParser: true,
                useCreateIndex: true
            },
            (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
            }
        });
    });

    it('create & save user successfully', async done => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.gender).toBe(userData.gender);
        expect(savedUser.dob).toBe(userData.dob);
        expect(savedUser.loginUsing).toBe(userData.loginUsing);
        done()
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async done => {
        const userWithInvalidField = new UserModel({ name: 'TekLoon', gender: 'Male', nickname: 'Handsome TekLoon' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.nickkname).toBeUndefined();
        done()
    });

    // Test Validation is working!!!
    // It should us told us the errors in on gender field.
    it('create user without required field should failed', async done => {
        const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.gender).toBeDefined();
        done()
    });

    
})