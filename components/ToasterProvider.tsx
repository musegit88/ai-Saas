"use client";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    setStarted(true);
  }, []);
  if (!started) {
    return null;
  }
  return <Toaster />;
}
