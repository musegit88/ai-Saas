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
        const { prompt } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!replicate.auth) {
            return new NextResponse("Replicate key not found", { status: 500 })
        }
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 500 })
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription()

        if (!freeTrial) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }

        const response = await replicate.run(
            "wcarle/stable-diffusion-videos-openjourney:bd5fd4290fc2ab4b6931c90aee17581a62047470422737e035f34badb8af4132",
            {

                input: {
                    prompt,
                    num_steps: 5
                }
            }
        )
        if (!isPro) {
            await increaseApiLimit()
        }
        // console.log(response)
        return NextResponse.json(response)

    } catch (error) {
        console.log("[VIDEO ERROR]", error)
    }

}