import { Phone, Mail, User } from 'lucide-react';

export default function HomeContactBar() {
  return (
    <section className="bg-foreground text-background py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
          <a
            href="tel:9373624669"
            className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">9373624669</span>
          </a>
          <span className="hidden sm:block opacity-30">|</span>
          <a
            href="mailto:blackraystravelagency@gmail.com"
            className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity"
          >
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">blackraystravelagency@gmail.com</span>
          </a>
          <span className="hidden sm:block opacity-30">|</span>
          <div className="flex items-center gap-2 opacity-90">
            <User className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">MD & Chairman: Om H Patil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
