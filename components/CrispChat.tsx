"use client";

import { useEffect, useState } from "react";
import { Crisp } from "crisp-sdk-web";

export default function CrispChat() {
  const [started, SetStarted] = useState(false);

  useEffect(() => {
    Crisp.configure("95726000-70a3-4a6e-a596-528a245473bc");
  }, []);

  return null;
}
