import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page"));
    const pageSize = Number(searchParams.get("pageSize"));

    // Example usage
    await connectToDatabase();
    const totalUser = await User.countDocuments({ status: true });
    const totalPages = Math.ceil(totalUser / Number(pageSize));

    if (page > totalPages && totalPages > 0) {
      return NextResponse.json(
        {
          message: `Requested page ${page} is out of bounds. Total pages: ${totalPages}`,
        },
        { status: 404 }
      );
    }
    const users = await User.find({ status: true })
      .select(["username", "limit"])
      .skip((Number(page) - 1) * Number(pageSize))
      .limit(Number(pageSize));

    return NextResponse.json(
      { users, totalPages, message: "Users limit fetched Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/users/limit:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
