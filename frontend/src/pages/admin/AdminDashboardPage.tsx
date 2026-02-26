import { Link } from '@tanstack/react-router';
import { Package, MessageSquare, LayoutDashboard, TrendingUp } from 'lucide-react';

const navCards = [
  {
    title: 'Manage Packages',
    description: 'Create, edit, and delete tour packages available to customers.',
    icon: <Package className="w-6 h-6" />,
    to: '/admin/packages',
    color: 'var(--deep-charcoal)',
  },
  {
    title: 'View Inquiries',
    description: 'Review and manage all customer inquiries and booking requests.',
    icon: <MessageSquare className="w-6 h-6" />,
    to: '/admin/inquiries',
    color: 'var(--charcoal)',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--light-beige)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--deep-charcoal)' }}
            >
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--charcoal)' }}>
                Admin Dashboard
              </h1>
              <p className="text-sm" style={{ color: 'var(--warm-grey)' }}>
                Blackrays Car Rentals & Tours and Travels
              </p>
            </div>
          </div>
        </div>

        {/* Stats placeholder */}
        <div
          className="rounded-2xl p-6 mb-8 flex items-center gap-4"
          style={{ backgroundColor: 'var(--warm-sand)', border: '1px solid var(--border)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--deep-charcoal)' }}
          >
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--charcoal)' }}>Welcome back!</div>
            <div className="text-xs" style={{ color: 'var(--warm-grey)' }}>
              Manage your travel business from this dashboard.
            </div>
          </div>
        </div>

        {/* Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {navCards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'white',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 12px -2px rgba(31,41,55,0.08)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                style={{ backgroundColor: card.color }}
              >
                {card.icon}
              </div>
              <h3 className="font-display text-lg font-bold mb-2 group-hover:underline" style={{ color: 'var(--charcoal)' }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-grey)' }}>
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
