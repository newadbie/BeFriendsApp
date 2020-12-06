import mongoose, { Schema, Document } from "mongoose";
import Joi, { ErrorReport, number } from 'joi';

export interface IDebtor extends Document {
  phoneNumber: number;
  name: string;
}

const debtorSchema : Schema<IDebtor> = new Schema({
    phoneNumber: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model<IDebtor>('Debtor', debtorSchema);