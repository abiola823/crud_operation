const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        default: user
    }

}, {timestamps: true});

const usersCollection = mongoose.Model(itemSchema, users);
module.exports = {
    usersCollection
};