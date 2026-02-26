import { Shield, AlertTriangle, FileText, Car, CreditCard, XCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

const sections = [
  {
    id: 'self-drive',
    icon: AlertTriangle,
    title: '1. Self-Drive (Without Driver) — Liability Clause',
    highlight: true,
    content: [
      'When renting a vehicle without a driver (self-drive), the renter assumes full responsibility for the vehicle from the time of pickup until the time of return.',
      'The renter is fully responsible for any damage, repair costs, or losses incurred to the vehicle during the rental period, including but not limited to: accidental damage, collision damage, scratches, dents, tyre damage, windscreen damage, and any mechanical damage caused by misuse.',
      'In the event of an accident, theft, or any incident involving the vehicle, the renter must immediately notify Blackrays Car Rentals & Tours and Travels and the relevant authorities.',
      'The renter shall bear all costs associated with repairs, towing, recovery, and any third-party claims arising from incidents during the self-drive rental period.',
      'Blackrays Car Rentals & Tours and Travels reserves the right to recover all repair and associated costs from the renter, including through legal means if necessary.',
    ],
  },
  {
    id: 'booking',
    icon: FileText,
    title: '2. Booking & Reservation Policy',
    highlight: false,
    content: [
      'All bookings are subject to vehicle availability at the time of confirmation.',
      'A booking is confirmed only after receiving written or verbal confirmation from Blackrays Car Rentals & Tours and Travels.',
      'Blackrays reserves the right to cancel or modify a booking in case of unforeseen circumstances, with prior notice to the customer.',
      'The customer must provide accurate personal details, including a valid government-issued ID, at the time of booking.',
    ],
  },
  {
    id: 'vehicle-use',
    icon: Car,
    title: '3. Vehicle Usage Restrictions',
    highlight: false,
    content: [
      'The rented vehicle must only be driven by the person(s) named in the rental agreement.',
      'The vehicle must not be used for any illegal activities, racing, or off-road driving unless specifically permitted.',
      'Smoking is strictly prohibited inside all rental vehicles. A cleaning fee will be charged for violations.',
      'The vehicle must not be driven under the influence of alcohol, drugs, or any substance that impairs driving ability.',
      'The vehicle must not be taken outside the agreed geographical area without prior written consent from Blackrays.',
      'Overloading the vehicle beyond its rated passenger or cargo capacity is strictly prohibited.',
    ],
  },
  {
    id: 'payment',
    icon: CreditCard,
    title: '4. Payment Terms',
    highlight: false,
    content: [
      'Payment terms will be communicated at the time of booking confirmation.',
      'Rates are subject to change without prior notice; the rate confirmed at the time of booking will apply.',
      'Any additional charges (fuel, tolls, parking, fines) incurred during the rental period are the responsibility of the renter.',
      'For self-drive rentals, a security deposit may be required and will be refunded upon return of the vehicle in its original condition.',
    ],
  },
  {
    id: 'cancellation',
    icon: XCircle,
    title: '5. Cancellation Policy',
    highlight: false,
    content: [
      'Cancellations must be communicated to Blackrays Car Rentals & Tours and Travels as early as possible.',
      'Cancellation charges may apply depending on the notice period and the type of booking.',
      'No-shows or last-minute cancellations (within 24 hours of the scheduled pickup) may result in forfeiture of any advance payment.',
      'Blackrays reserves the right to apply cancellation fees at its discretion based on the circumstances.',
    ],
  },
  {
    id: 'general',
    icon: Shield,
    title: '6. General Terms',
    highlight: false,
    content: [
      'Blackrays Car Rentals & Tours and Travels acts as a travel service facilitator. For railway and flight bookings, we assist in the booking process but are not the carrier.',
      'Blackrays is not liable for delays, cancellations, or changes made by airlines, railways, or other third-party service providers.',
      'These terms and conditions are subject to change without prior notice. The latest version will always be available on our website.',
      'By using our services, you agree to be bound by these terms and conditions.',
      'Any disputes arising from the use of our services shall be subject to the jurisdiction of the courts in India.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-background/15 rounded-sm flex items-center justify-center">
              <FileText className="w-6 h-6 text-background" />
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">Terms & Conditions</h1>
              <p className="opacity-60 text-sm mt-1">Last updated: February 2026</p>
            </div>
          </div>
          <p className="opacity-70 text-base leading-relaxed max-w-2xl">
            Please read these terms and conditions carefully before using our services. By booking with Blackrays Car Rentals & Tours and Travels, you agree to be bound by these terms.
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-6 bg-secondary/40 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground font-medium">
              <strong>Important:</strong> Self-drive (without driver) renters are fully responsible for any damage or loss to the vehicle during the rental period. See Section 1 for full details.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className={`border rounded-sm p-6 ${
                  section.highlight
                    ? 'border-foreground bg-foreground/5'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 ${
                    section.highlight ? 'bg-foreground' : 'bg-secondary'
                  }`}>
                    <section.icon className={`w-5 h-5 ${section.highlight ? 'text-background' : 'text-foreground'}`} />
                  </div>
                  <h2 className={`font-display text-lg font-bold pt-1.5 ${section.highlight ? 'text-foreground' : 'text-foreground'}`}>
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3 ml-14">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-secondary/30 border border-border rounded-sm text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Have questions about our terms? Contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild>
                <Link to="/car-rentals">Book a Car</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
