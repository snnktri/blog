import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    }
});

export const Image = mongoose.model('Image', imageSchema);