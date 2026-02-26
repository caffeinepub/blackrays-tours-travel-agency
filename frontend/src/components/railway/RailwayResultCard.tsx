import React, { useState } from 'react';
import { Train, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { TrainResult, formatFare } from '../../services/railwayApi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RailwayResultCardProps {
  train: TrainResult;
  onBook?: (train: TrainResult, selectedClass: string) => void;
}

export default function RailwayResultCard({ train, onBook }: RailwayResultCardProps) {
  const [selectedClass, setSelectedClass] = useState(train.classes[0]?.code || '');
  const [showClasses, setShowClasses] = useState(false);

  const selectedClassData = train.classes.find((c) => c.code === selectedClass);

  const handleBook = () => {
    if (onBook) {
      onBook(train, selectedClass);
    } else if (train.bookingUrl) {
      window.open(train.bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-premium hover:shadow-premium-lg transition-all duration-300 overflow-hidden animate-slide-up">
      <div className="p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Train Info */}
          <div className="flex-1">
            {/* Train name & number */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center">
                <Train className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold font-display">{train.trainName}</p>
                <p className="text-xs text-muted-foreground">#{train.trainNumber}</p>
              </div>
              <div className="ml-auto flex gap-1 flex-wrap">
                {train.runsOn.map((day) => (
                  <span key={day} className="text-xs bg-muted px-1.5 py-0.5 rounded font-medium">{day}</span>
                ))}
              </div>
            </div>

            {/* Times */}
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold font-display">{train.departureTime}</p>
                <p className="text-xs font-semibold text-muted-foreground">{train.originCode}</p>
                <p className="text-xs text-muted-foreground truncate max-w-20">{train.originStation}</p>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {train.duration}
                </div>
                <div className="w-full flex items-center gap-1">
                  <div className="flex-1 h-px bg-border" />
                  <Train className="w-3 h-3 text-muted-foreground" />
                  <div className="flex-1 h-px bg-border" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold font-display">{train.arrivalTime}</p>
                <p className="text-xs font-semibold text-muted-foreground">{train.destinationCode}</p>
                <p className="text-xs text-muted-foreground truncate max-w-20">{train.destinationStation}</p>
              </div>
            </div>

            {/* Class selector toggle */}
            <button
              type="button"
              onClick={() => setShowClasses(!showClasses)}
              className="mt-3 flex items-center gap-1 text-sm font-medium hover:text-foreground text-muted-foreground transition-colors"
            >
              {showClasses ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showClasses ? 'Hide' : 'View'} Available Classes
            </button>

            {showClasses && (
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 animate-fade-in">
                {train.classes.map((cls) => (
                  <button
                    key={cls.code}
                    type="button"
                    onClick={() => cls.available && setSelectedClass(cls.code)}
                    disabled={!cls.available}
                    className={`p-2 rounded-lg border text-left transition-all duration-200 ${
                      selectedClass === cls.code
                        ? 'border-foreground bg-foreground text-background'
                        : cls.available
                        ? 'border-border hover:border-foreground/50 bg-background'
                        : 'border-border bg-muted opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <p className="text-xs font-bold">{cls.code}</p>
                    <p className="text-xs truncate">{cls.name}</p>
                    <p className="text-xs font-semibold mt-0.5">{formatFare(cls.fare)}</p>
                    {!cls.available && <p className="text-xs text-destructive">Not available</p>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fare & CTA */}
          <div className="lg:w-44 flex flex-col items-end justify-between gap-3 lg:border-l lg:border-border lg:pl-4">
            <div className="text-right">
              {selectedClassData ? (
                <>
                  <p className="text-2xl font-bold font-display">{formatFare(selectedClassData.fare)}</p>
                  <p className="text-xs text-muted-foreground">per person · {selectedClassData.name}</p>
                  {selectedClassData.availableSeats && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {selectedClassData.availableSeats} seats available
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Select a class</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-auto">
              {selectedClassData && (
                <Badge variant="outline" className="text-xs justify-center">
                  {selectedClassData.code} · {selectedClassData.name}
                </Badge>
              )}
              <Button
                onClick={handleBook}
                disabled={!selectedClassData?.available}
                className="w-full gap-1"
                size="sm"
              >
                Book Now
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
