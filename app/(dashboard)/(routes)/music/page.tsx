"use client";
import Header from "@/components/Header";
import { Music } from "lucide-react";

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
    .min(2, { message: "Please write a propmt to generate image" }),
});

export default function MusicGenerationPage() {
  const proModal = useProModal();
  const [musics, setMusics] = useState<any[]>([]);
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
      const response = await axios.post("/api/music", {
        prompt_a: values.prompt,
      });
      setMusics([response.data]);
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
        title="Music Generation"
        color="bg-gradient-to-r from-lime-500 to-green-400 bg-clip-text text-transparent"
        description="Unleash Your Creativity with AI-Powered Music Generation"
        icon={Music}
        iconColor="text-lime-500"
        bgColor="bg-lime-500/10"
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
          {musics.length === 0 && !isLoading && (
            <Empty lable="No generation started" />
          )}
          <div>
            {musics.map((item) => (
              <div className="mt-8 w-full" key={item.audio}>
                <audio src={item.audio} controls className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
