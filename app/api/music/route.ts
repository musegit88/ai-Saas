import { NextResponse } from 'next/server';


import { auth } from "@clerk/nextjs";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/apiLimit"
import { checkSubscription } from "@/lib/subscription"


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
    // auth: process.env.REPLICATE_API_TOKEN! || ""
})

export async function POST(req: Request) {

    try {
        const { userId } = auth();
        const body = await req.json()
        const { prompt_a } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!replicate.auth) {
            return new NextResponse("Replicate key not found", { status: 500 })
        }
        if (!prompt_a) {
            return new NextResponse("Prompt is required", { status: 500 })
        }
        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription()
        if (!freeTrial) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }

        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {

                input: {
                    prompt_a,
                }
            }
        )
        if (!isPro) {
            await increaseApiLimit()
        }
        // console.log(response)
        return NextResponse.json(response)

    } catch (error) {
        console.log("[MUSIC ERROR]", error)
    }

}