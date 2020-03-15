import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RegantRefrigeratorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    serialNo: {
        type: String,
        required: true
    },
    range: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    dataCollection: { 
        type: Object, required: true },
});

export default mongoose.model("regantRefrigerators", RegantRefrigeratorSchema);