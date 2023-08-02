"use client";
import Header from "@/components/Header";
import { Download, ImageIcon } from "lucide-react";

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
import { useState } from "react";
import Loading from "@/components/Loading";
import Empty from "@/components/Empty";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { useProModal } from "@/hooks/useProModal";
import {toast} from "react-hot-toast"

const formSchema = z.object({
  prompt: z
    .string()
    .min(2, { message: "Please write a propmt to generate image" }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

const amountOptions = [
  {
    value: "1",
    lable: "1 Photo",
  },
  {
    value: "2",
    lable: "2 Photos",
  },
  {
    value: "3",
    lable: "3 Photos",
  },
  {
    value: "4",
    lable: "4 Photos",
  },
];
const resolutionOptions = [
  {
    value: "256x256",
    lable: "256x256",
  },
  {
    value: "512x512",
    lable: "512x512",
  },
  {
    value: "1024x1024",
    lable: "1024x1024",
  },
];
export default function ImageGenerationPage() {
  const proModal = useProModal();
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "256x256",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      // console.log(values)
      const response = await axios.post("/api/image", {
        resolution: values.resolution,
        text: values.prompt,
        num_images: values.amount,
      });

      const urls = response.data.map(
        (image: { image_resource_url: string }) => image.image_resource_url
      );
      setImages(urls);
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
        title="Image Generation"
        color="bg-gradient-to-r from-fuchsia-500 to-pink-400 bg-clip-text text-transparent"
        description="Bring Your Imagination to Life"
        icon={ImageIcon}
        iconColor="text-fuchsia-500"
        bgColor="bg-fuchsia-500/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
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
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Amount"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((amount) => (
                          <SelectItem key={amount.value} value={amount.value}>
                            {amount.lable}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((resolution) => (
                          <SelectItem key={resolution.value} value={resolution.value}>
                            {resolution.lable}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className="p-20">
              <Loading text="Prime is generating" />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty lable="No images generated" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((image) => (
              <Card key={image} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={image} alt="image" fill />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(image)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
