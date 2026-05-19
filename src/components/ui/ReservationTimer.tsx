import { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { getTimeRemaining, isReservationValid } from '../../lib/cart';

interface ReservationTimerProps {
  reservedAt: number;
}

export default function ReservationTimer({ reservedAt }: ReservationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(reservedAt));
  const [valid, setValid] = useState(isReservationValid(reservedAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(reservedAt));
      setValid(isReservationValid(reservedAt));
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, [reservedAt]);

  if (!valid) {
    return (
      <div className="flex items-center gap-1.5 text-sole-coral">
        <AlertTriangle size={12} />
        <span className="font-body text-xs font-medium">Reservation expired</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-sole-amber">
      <Clock size={12} />
      <span className="font-body text-xs font-medium">Reserved for {timeLeft}</span>
    </div>
  );
}
