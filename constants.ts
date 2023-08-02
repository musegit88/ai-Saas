import {
    Code2Icon,
    Image,
    MessageSquare,
    Music4,
    Video,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5

export const tabs = [
    {
        lable: "Conversation",
        icon: MessageSquare,
        bgColor: "bg-purple-500/10",
        color: "text-purple-500",
        href: "/conversation",
    },
    {
        lable: "Image Generation",
        icon: Image,
        bgColor: "bg-fuchsia-500/10",
        color: "text-fuchsia-500",
        href: "/image",
    },
    {
        lable: "Video Generation",
        icon: Video,
        bgColor: "bg-violet-500/10",
        color: "text-violet-500",
        href: "/video",
    },
    {
        lable: "Music Generation",
        icon: Music4,
        bgColor: "bg-lime-500/10",
        color: "text-lime-500",
        href: "/music",
    },
    {
        lable: "Code Generation",
        icon: Code2Icon,
        bgColor: "bg-emerald-500/10",
        color: "text-emerald-500",
        href: "/code",
    },
];