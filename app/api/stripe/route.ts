import { auth, currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { absoluteUrl } from "@/lib/utils"
import { stripe } from "@/lib/stripe"
import prismadb from "@/lib/prismadb"


const settingsUrl = absoluteUrl("/settings")

export async function GET() {
    try {
        const { userId } = auth()
        const user = await currentUser()

        // check if user is authenticated
        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // check if user has subscription
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId: userId
            }
        })

        // if user has subscription, redirect to billing portal
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })
            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        // create new checkout session for new subscription
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Prime Pro",
                            description: "Unlimited AI generation"

                        },
                        unit_amount: 2400,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId
            }
        })
        // return url to checkout session
        return new NextResponse(JSON.stringify({ url: stripeSession.url }))

    } catch (error) {
        console.log("[STRIPE_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}