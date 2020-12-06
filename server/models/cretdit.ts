import { number } from "joi";
import { ObjectID } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";
import { IDebtor } from "./debtor";
import { IUser } from "./user";

export interface ICredit extends Document {
  debtor: ObjectID;
  user: ObjectID;
  creditValue: number;
  isPaidOff: boolean;
}

const creditSchema : Schema<ICredit> = new Schema({
    debtor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Debtor'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    creditValue: {
        type: Number,
        required: true,
    },
    isPaidOff: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model<ICredit>("Credit", creditSchema);