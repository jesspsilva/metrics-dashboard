import { ProgressBar as Chart, Color } from "@tremor/react";
import { useEffect, useState } from "react";

export default function ProgressBar({
  value,
  color,
}: {
  value: number;
  color: Color;
}) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const increment = value / 40;

    const updateNumber = () => {
      setNumber((prev) => {
        if (prev < value) {
          const nextValue = Math.min(prev + increment, value);
          return nextValue;
        }
        return prev;
      });
    };

    const interval = setInterval(updateNumber, 15);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return <Chart value={number} color={color} className="mt-3" />;
}
