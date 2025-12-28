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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-4 shadow-lift hover:shadow-xl transition-all group"
      style={{ borderRadius: 0 }}
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      <div className="hidden md:block">
        <div className="text-xs font-medium opacity-90">Ask About Next Workshop</div>
        <div className="text-sm font-bold">0310 3336485</div>
      </div>
    </a>
  );
};

export default WhatsAppCTA;
