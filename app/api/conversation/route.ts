import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!replicate.auth) {
      return new NextResponse("Replicate key not found", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Message is required ", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const response = await replicate.run(
      "replicate/llama70b-v2-chat:2d19859030ff705a87c746f7e96eea03aefb71f166725aee39692f1476566d48",
      {
        input: {
          prompt: messages,
        },
      }
    );
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response);
  } catch (error) {
    console.log("[CONVERSATION ERROR]", error);
  }
}
