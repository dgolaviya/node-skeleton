import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MonthlyLog = new Schema({
    name: {
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
    dailyProcedure: { 
        type: Object, required: true },
    weeklyProcedure: { 
        type: Object, required: true },
    monthlyProcedure: { 
        type: Object, required: true },
    troubleShootingNotes: {
        type: String
    },    
});

export default mongoose.model("monthlyLog", MonthlyLog);