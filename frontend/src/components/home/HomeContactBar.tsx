import { Phone, Mail, User } from "lucide-react";

export default function HomeContactBar() {
  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-xs">
        <div className="flex items-center gap-1.5 font-medium">
          <User className="w-3 h-3 opacity-70" />
          <span className="opacity-80">MD & Chairman:</span>
          <span className="font-semibold">Om H Patil</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:9373624669" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Phone className="w-3 h-3 opacity-70" />
            <span>9373624669</span>
          </a>
          <a href="mailto:blackraystravelagency@gmail.com" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Mail className="w-3 h-3 opacity-70" />
            <span className="hidden sm:inline">blackraystravelagency@gmail.com</span>
            <span className="sm:hidden">Email Us</span>
          </a>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 opacity-70">
          <span>Dhule, Maharashtra 424001</span>
        </div>
      </div>
    </div>
  );
}
