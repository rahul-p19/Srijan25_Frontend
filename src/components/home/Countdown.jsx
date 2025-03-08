import { useEffect, useState } from "react";
export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("2025-04-17T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)) > 0 ? Math.floor(distance / (1000 * 60 * 60 * 24)) : 0,
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ) > 0 ? Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ) : 0,
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) > 0 ? Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) : 0,
        seconds: Math.floor((distance % (1000 * 60)) / 1000) > 0 ? Math.floor((distance % (1000 * 60)) / 1000) : 0,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="bg-transparent flex flex-col items-center justify-center space-y-4 px-0.5 backdrop-blur-lg w-full h-full font-sometypeMono ">

        <div className="flex items-center text-center">
          {Object.entries(timeLeft).map(([unit, value],ind) => (
            <div
              key={unit}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-base lg:text-2xl xl:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple to-red text-nowrap">
                {value.toString().padStart(2, "0")}{ind!==3 ? " :\u2002" : ""}
              </span>

              {/* <span className="text-sm text-white capitalize hidden sm:block">{unit}</span>
              <span className="text-sm text-white capitalize sm:hidden">{unit.charAt(0)}</span> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}