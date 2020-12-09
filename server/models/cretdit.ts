import { ObjectID } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";

enum paidStatus {
    paid = "paid",
    unpaid = "unpaid"
}

export interface ICredit extends Document {
  debtor: ObjectID;
  user: ObjectID;
  creditValue: number;
  isPaidOff: paidStatus;
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
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
        required: true
    }
})

export default mongoose.model<ICredit>("Credit", creditSchema);