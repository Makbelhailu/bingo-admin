import { Schema, model, models, Document } from "mongoose";

interface ICartelaModel extends Document {
  numbers: Map<string, number[]>;
  isDefault: boolean;
}

const CartelaSchema = new Schema<ICartelaModel>(
  {
    numbers: {
      type: Map,
      of: [[Number]],
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Cartela =
  models.Cartela || model<ICartelaModel>("Cartela", CartelaSchema);
