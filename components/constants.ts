import {
    CodeIcon,
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    MusicIcon,
    Settings,
    VideoIcon,
} from "lucide-react";

export const routes = [
    {
        lable: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-indigo-500",
    },
    {
        lable: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-purple-500",
    },
    {
        lable: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-fuchsia-500",
    },
    {
        lable: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-violet-500",
    },
    {
        lable: "Music Generation",
        icon: MusicIcon,
        href: "/music",
        color: "text-lime-500",
    },
    {
        lable: "Code Generation",
        icon: CodeIcon,
        href: "/code",
        color: "text-emerald-700",
    },
    {
        lable: "Settings",
        icon: Settings,
        href: "/settings",
    },
];


