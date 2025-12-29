import { MessageCircle } from "lucide-react";

const WhatsAppCTA = () => {
  const phoneNumber = "03103336485";
  const message = "Hi! I'd like to know about the next workshop.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 sm:px-5 sm:py-4 rounded-full sm:rounded-none shadow-xl hover:shadow-2xl transition-all group active:scale-95"
    >
      <MessageCircle className="w-7 h-7 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      <div className="hidden md:block">
        <div className="text-xs font-medium opacity-90">Ask About Next Workshop</div>
        <div className="text-sm font-bold">0310 3336485</div>
      </div>
    </a>
  );
};

export default WhatsAppCTA;
