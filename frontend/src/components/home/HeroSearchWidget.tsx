import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Car, Plane, Hotel, Train, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "car", label: "Cars", icon: Car, href: "/car-rentals" },
  { id: "flight", label: "Flights", icon: Plane, href: "/flights" },
  { id: "hotel", label: "Hotels", icon: Hotel, href: "/hotels" },
  { id: "train", label: "Trains", icon: Train, href: "/railway" },
  { id: "package", label: "Packages", icon: Package, href: "/packages" },
];

export default function HeroSearchWidget() {
  const [activeTab, setActiveTab] = useState("car");
  const navigate = useNavigate();

  const handleSearch = () => {
    const tab = tabs.find((t) => t.id === activeTab);
    if (tab) navigate({ to: tab.href });
  };

  return (
    <div className="search-widget p-1.5">
      {/* Tabs */}
      <div className="flex gap-0.5 mb-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/60 hover:text-foreground hover:bg-black/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search Row */}
      <div className="flex gap-2 p-2">
        <div className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground">
          {activeTab === "car" && "Pickup location — Dhule, Maharashtra"}
          {activeTab === "flight" && "From → To (e.g. Mumbai to Dubai)"}
          {activeTab === "hotel" && "Destination city or hotel name"}
          {activeTab === "train" && "Origin station → Destination"}
          {activeTab === "package" && "Where do you want to go?"}
        </div>
        <Button
          onClick={handleSearch}
          className="btn-premium px-6 rounded-xl font-semibold"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
