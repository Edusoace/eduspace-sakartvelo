"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/995557410800";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full
        bg-[#25D366] text-white shadow-glass animate-pulse-glow
        transition-transform duration-200 hover:scale-110 active:scale-95
        md:h-16 md:w-16"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" fill="white" strokeWidth={0} />
      <span className="sr-only">Open WhatsApp chat</span>
    </a>
  );
}
