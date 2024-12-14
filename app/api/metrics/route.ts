import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";
import { Cartela } from "@/models/cartela";
import { Game } from "@/models/game";

export async function GET() {
  try {
    await connectToDatabase();
    const totalUsers = await User.countDocuments({});
    const totalPlays = await Game.countDocuments({});
    const totalCartelas = await Cartela.countDocuments({});
    const activeUsers = await User.countDocuments({ status: true });

    return NextResponse.json(
      {
        totalUsers,
        totalPlays,
        totalCartelas,
        activeUsers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/metrics:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
