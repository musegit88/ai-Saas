import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { increaseApiLimit, checkApiLimit } from "@/lib/apiLimit"
import { checkSubscription } from "@/lib/subscription"


const sdk = require('api')('@eden-ai/v2.0#aopbwm1buljpui144');
sdk.auth(process.env.EDEN_AI_API_TOKEN);
export async function POST(req: Request,) {
    try {
        const { userId } = auth();
        const body = await req.json()
        const { resolution, text, num_images } = body;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!sdk.auth) {
            return new NextResponse("sdk key not found", { status: 500 })
        }
        if (!text) {
            return new NextResponse("Prompt is required ", { status: 400 })
        }
        if (!resolution) {
            return new NextResponse("Resolution is required ", { status: 400 })
        }
        if (!num_images) {
            return new NextResponse("Amount is required ", { status: 400 })
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription()

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }

        const { data } = await sdk.image_generation_create({
            resolution,
            providers: 'openai',
            text,
            num_images,
        });
        if (!isPro) {
            await increaseApiLimit()
        }
        return NextResponse.json(data.openai.items)
    } catch (error) {
        console.log("[IMAGE ERROR]", error)
    }
}