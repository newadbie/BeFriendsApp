import Joi from "joi";
import { ObjectID } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";

export enum payStatus {
  paid = "paid",
  unpaid = "unpaid",
}

export interface ICredit extends Document {
  debtor: ObjectID;
  user: ObjectID;
  creditValue: number;
  isPaidOff: payStatus;
  creditName: string;
  payCode: string;
}

const creditSchema: Schema<ICredit> = new Schema(
  {
    debtor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Debtor",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    creditValue: {
      type: Number,
      required: true,
    },
    isPaidOff: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
      required: true,
    },
    creditName: {
      type: String,
      required: true,
    },
    payCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const joiCreditSchema = Joi.object().keys({
  creditName: Joi.string().required().min(4).max(13),
  creditValue: Joi.number().min(1).required(),
  debtor: Joi.object()
});

export default mongoose.model<ICredit>("Credit", creditSchema);
