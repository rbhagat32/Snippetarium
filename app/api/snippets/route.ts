import connect from "@/app/lib/connect";
import Snippet from "@/app/models/snippet";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      creationDate,
      isTrash,
    } = await req.json();

    await connect();

    const note = new Snippet({
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      creationDate,
      isTrash,
    });

    const savedNote = await note.save();

    return NextResponse.json({ notes: savedNote });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connect();
    const notes = await Snippet.find({ clerkUserId: clerkId });
    return NextResponse.json({ notes: notes });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(request: any) {
  try {
    const snippetId = request.nextUrl.searchParams.get("snippetId");
    const {
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      creationDate,
      isTrash,
    } = await request.json();

    if (!snippetId) {
      return NextResponse.json({ message: "Snippet ID is required" }, { status: 400 });
    }

    await connect();

    const updatedSnippet = await Snippet.findOneAndUpdate(
      { _id: snippetId },
      {
        $set: {
          title,
          isFavorite,
          clerkUserId,
          tags,
          description,
          code,
          language,
          creationDate,
          isTrash,
        },
      },
      { returnDocument: "after" }
    );

    return NextResponse.json({
      note: updatedSnippet,
    });
  } catch (error) {
    console.error("Error updating snippet:", error);
    return NextResponse.json({ status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const snippetId = url.searchParams.get("snippetId");

    if (!snippetId) {
      return NextResponse.json({ message: "snippetId is required" }, { status: 400 });
    }

    const snippetToDelete = await Snippet.findOneAndDelete({ _id: snippetId });

    if (!snippetToDelete) {
      return NextResponse.json({ message: "Snippet not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return NextResponse.json({ message: "Failed to delete snippet" }, { status: 500 });
  }
}
