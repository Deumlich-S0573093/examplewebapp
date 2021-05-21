const mongoose = require('mongoose');
const TopicModel = require('../../models/topic');

const topicData = {
    title: 'Mongoose and Jest',
    description: 'Build unit test for addind data to the database'
};

describe('Tests if a NEW topic can be written to the database', () => {
    
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
    
    it('should save a new topic', async done => {
        const validTopic = new TopicModel(topicData);
        const savedTopic = await validTopic.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedTopic._id).toBeDefined();
        expect(savedTopic.title).toBe(topicData.title);
        expect(savedTopic.description).toBe(topicData.description);
        done()
    });
    
});