import { Schema, model, models, Document } from "mongoose";

interface IUserModel extends Document {
  name: string;
  username: string;
  password: string;
  cut: number;
  houseCut: number;
  limit: number;
  cartela: Schema.Types.ObjectId | null;
  status: boolean;
}

const UserSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cut: Number,
    houseCut: {
      type: Number,
      default: 0.2,
    },
    limit: {
      type: Number,
      default: 10000,
    },
    cartela: {
      type: Schema.Types.ObjectId,
      ref: "Cartela",
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = models.User || model<IUserModel>("User", UserSchema);
