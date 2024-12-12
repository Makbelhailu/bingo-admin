import { Schema, model, models, Document } from "mongoose";

interface IGameModel extends Document {
  userId: Schema.Types.ObjectId;
  bet: number;
  players: number;
  totalWin: number;
  houseWin: number;
  cut: number;
}

const GameSchema = new Schema<IGameModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    bet: { type: Number, required: true },
    players: { type: Number, required: true },
    totalWin: { type: Number, required: true },
    houseWin: { type: Number, required: true },
    cut: { type: Number, required: true },
  },
  { timestamps: true }
);

GameSchema.index({ userId: 1 }, { unique: true });

export const Game = models.Game || model<IGameModel>("Game", GameSchema);
