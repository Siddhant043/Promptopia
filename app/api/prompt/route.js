import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();
    const { search } = await req.json();
    const searchRegex = new RegExp(search, "i");
    const query = {
      $or: [
        { prompt: searchRegex },
        { tag: search },
        { "creator.username": search },
      ],
    };

    const prompts = await Prompt.find(query).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch prompts:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch prompts" }), {
      status: 500,
    });
  }
};
