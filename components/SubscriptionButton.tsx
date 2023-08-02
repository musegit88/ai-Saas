"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import {toast} from "react-hot-toast"

interface SubscriptionButtonProps {
  isPro: boolean;
}
export default function SubscriptionButton({
  isPro = false,
}: SubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={isPro ? "default" : "gradient"} onClick={handleClick}>
      {isPro ? "Manage Subscription" : "Upgrade"}
    </Button>
  );
}
