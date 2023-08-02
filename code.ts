// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
// const configration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(configration);

// export async function POST(req: Request) {
//     try {
//         const { userId } = auth()
//         const body = await req.json();
//         const { messages } = body;

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 })
//         }
//         if (!configration.apiKey) {
//             return new NextResponse("OpenAI API key not found", { status: 401 })
//         }

//         if (!messages) {
//             return new NextResponse("Message is required", { status: 400 })
//         }
//         const response = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages
//         })
//         return NextResponse.json(response.data.choices[0].message)

//     } catch (error) {
//         console.log("[CONVERSATION ERROR]", error)
//         return new NextResponse("Internal error", { status: 500 })
//     }

// }


// Page.tsx conversation
      // const userMessage: ChatCompletionRequestMessage = {
      //   role: "user",
      //   content: values.prompt,
      // };
      // const newMessages = [...messages, userMessage];
      // setMessages((current) => [...current, userMessage, response.data]);


        // {/* <div className="space-y-4 mt-4">
        //   <div className="flex flex-col-reverse gap-y-4">
        //     {messages.map((message) => (
        //       <div key={message.content}>{message.content}</div>
        //     ))}
        //   </div>
        // </div> */}
        // const {prompt} = req.body;
// const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: `${prompt}`,
//     temperature: 0.5,
//     max_tokens: 256,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,