"use client";

import { useEffect, useState } from "react";
import ProModal from "./ProModal";

export default function ModalProvider() {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    setStarted(true);
  }, []);
  if (!started) {
    return null;
  }
  return (
    <>
      <ProModal />
    </>
  );
}
