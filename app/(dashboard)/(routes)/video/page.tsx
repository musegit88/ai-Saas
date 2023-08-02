"use client";
import Header from "@/components/Header";
import { Video } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loading from "@/components/Loading";
import Empty from "@/components/Empty";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/useProModal";
import {toast} from "react-hot-toast"

const formSchema = z.object({
  prompt: z
    .string()
    .min(2, { message: "Please write a propmt to generate video" }),
});

export default function VideoGenerationPage() {
  const proModal = useProModal();
  const [video, setVideo] = useState<string>();
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
      const response = await axios.post("/api/video", {
        prompt: values.prompt,
      });
      setVideo(response.data);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }else{
        toast.error("Something went wrong")
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Header
        title="Video Generation"
        color="bg-gradient-to-r from-violet-500 to-purple-400 bg-clip-text text-transparent"
        description="Create stunning videos in minutes."
        icon={Video}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loading text="Prime is generating ...." />
            </div>
          )}
          {!video && !isLoading && <Empty lable="No generation started" />}
          {video && (
            <video src={video} controls className="mt-8 w-full aspect-video" />
          )}
        </div>
      </div>
    </div>
  );
}
