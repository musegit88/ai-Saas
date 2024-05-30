"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";
import { MessageSquare } from "lucide-react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import UserAvatar from "@/components/UserAvatar";
import { useProModal } from "@/hooks/useProModal";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  prompt: z.string().min(2, { message: "Please write a propmt" }),
});

export default function ConversationPage() {
  const proModal = useProModal();
  const [messages, setMessages] = useState<any[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessages = { content: values.prompt };

      const response = await axios.post("/api/conversation", {
        messages: values.prompt,
      });
      setMessages((current) => [
        ...current,
        userMessages,
        { res: response.data },
      ]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Header
        title="Conversation"
        color="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent"
        description="Connecting you with intelligent conversations."
        icon={MessageSquare}
        iconColor="text-purple-500"
        bgColor="bg-purple-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full border rounded-lg px-3 p-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        placeholder="write a propmt"
                        disabled={isLoading}
                        className="px-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="col-span-12 lg:col-span-2 w-full"
                aria-description="button"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loading text="Prime is thinking ...." />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty lable="No conversation started" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.content
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.content ? (
                  <UserAvatar />
                ) : (
                  <h6 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Prime
                  </h6>
                )}
                <p className="text-sm">{message.content}</p>

                <p className="text-sm">{message.res}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
