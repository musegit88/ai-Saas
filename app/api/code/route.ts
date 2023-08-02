import { NextResponse } from 'next/server';


import { auth } from "@clerk/nextjs";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/apiLimit"
import { checkSubscription } from "@/lib/subscription"

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})



export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json()
        const { messages } = body


        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!replicate.auth) {
            return new NextResponse("Replicate key not found", { status: 500 })
        }
        if (!messages) {
            return new NextResponse("Message is required ", { status: 400 })
        }
        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription()

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }
        const response = await replicate.run(
            "lucataco/replit-code-v1-3b:fe0665eed1ebe7ea61a69d86c8f760d2e95c62a6820b150b9f36bf6d067590dc",
            {

                input: {
                    prompt: messages,
                    system_prompt: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation",
                }
            }
        )
        if (!isPro) {
            await increaseApiLimit()
        }


        return NextResponse.json(response)

    } catch (error) {
        console.log("[CODE ERROR]", error)
    }
}

