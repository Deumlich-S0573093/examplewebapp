const mongoose = require('mongoose');

describe('Tests for the database connections', () => {
    
    it('shall test the connection to local db', () => {
        const databaseName = 'yapp-db'
        beforeAll(async () => {
            const url = `mongodb://127.0.0.1/${databaseName}`
            await mongoose.connect(url, { useNewUrlParser: true })
          });
    });

    it('shall test the connection to mongodb cloud cluster', () => {
        const databaseName = 'myFirstDatabase'
        beforeAll(async () => {
            const url = `mongodb+srv://group04:wtat-ss21@cluster0.lsuqg.mongodb.net/${databaseName}?retryWrites=true&w=majority`
            await mongoose.connect(url, { useNewUrlParser: true })
          });
    });
});

