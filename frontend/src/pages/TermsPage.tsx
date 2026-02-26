export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using Blackrays Car Rentals & Tours and Travels services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      title: '2. Booking & Reservations',
      content: `All bookings are subject to availability. A booking is confirmed only upon receipt of the required deposit or full payment. Blackrays reserves the right to cancel any booking if payment is not received within the stipulated time.`,
    },
    {
      title: '3. Cancellation Policy',
      content: `Cancellations made 7 or more days before the travel date will receive a full refund minus processing fees. Cancellations made 3-6 days before travel will receive a 50% refund. Cancellations made less than 3 days before travel are non-refundable.`,
    },
    {
      title: '4. Car Rental Terms',
      content: `All car rentals include a professional driver. The customer is responsible for any damage caused to the vehicle due to negligence. Fuel costs are included in the quoted price unless otherwise specified. The driver's accommodation and meals during outstation trips are the customer's responsibility.`,
    },
    {
      title: '5. Tour Package Terms',
      content: `Tour packages include services as specified in the package description. Any additional services requested during the tour will be charged separately. Blackrays is not responsible for delays or cancellations due to weather, natural disasters, or other force majeure events.`,
    },
    {
      title: '6. Flight & Railway Bookings',
      content: `Flight and railway bookings are subject to the terms and conditions of the respective airlines and railway authorities. Blackrays acts as an intermediary and is not responsible for delays, cancellations, or changes made by the service providers.`,
    },
    {
      title: '7. Privacy Policy',
      content: `We collect personal information necessary to process your bookings and provide our services. Your information will not be shared with third parties except as required to complete your booking. We take reasonable measures to protect your personal data.`,
    },
    {
      title: '8. Liability',
      content: `Blackrays shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our maximum liability shall not exceed the amount paid for the specific service in question.`,
    },
    {
      title: '9. Contact Information',
      content: `For any queries regarding these terms, please contact us at blackraystravelagency@gmail.com or call +91 93736 24669. Our office is located in Nagpur, Maharashtra, India.`,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-beige)' }}>
      {/* Hero */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: 'var(--deep-charcoal)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--gold-accent) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold-accent)' }}>
            Legal
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-base" style={{ color: 'rgba(250,247,242,0.70)' }}>
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
            >
              <h2 className="font-display text-lg font-bold mb-3" style={{ color: 'var(--charcoal)' }}>
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-grey)' }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
