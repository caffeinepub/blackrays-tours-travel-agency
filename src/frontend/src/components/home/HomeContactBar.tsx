import { Phone, Mail, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function HomeContactBar() {
  return (
    <div className="container py-6">
      <Card className="bg-card border-2 border-primary/20">
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Phone className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <a href="tel:9373624669" className="font-semibold hover:text-primary transition-colors">
                  9373624669
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a href="mailto:blackraystravelagency@gmail.com" className="font-semibold hover:text-primary transition-colors text-sm">
                  blackraystravelagency@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <User className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">MD & Chairman</p>
                <p className="font-semibold">Om H Patil</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
