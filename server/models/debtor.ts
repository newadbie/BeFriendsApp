import mongoose, { Schema, Document } from "mongoose";
import Joi from 'joi';

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

export const joiDebtorSchema = Joi.object().keys({
    phoneNumber: Joi.number().integer().required().min(8).max(9),
    name: Joi.string().required().min(5)
})

export default mongoose.model<IDebtor>('Debtor', debtorSchema);