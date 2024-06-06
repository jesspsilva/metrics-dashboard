import styled from "styled-components";
import { ProgressCircle as Chart, Size } from "@tremor/react";
import { useEffect, useState } from "react";

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .recharts-tooltip-wrapper .text-tremor-content {
    text-transform: capitalize;
  }
`;

const H2 = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
`;

export default function ProgressCircle({
  value,
  title,
  color,
  size = "xl",
}: {
  value: number;
  title?: string;
  color: string;
  size?: Size;
}) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const increment = value / 20;

    const updateNumber = () => {
      setNumber((prev) => {
        if (prev < value) {
          const nextValue = Math.min(prev + increment, value);
          return nextValue;
        }
        return prev;
      });
    };

    const interval = setInterval(updateNumber, 20);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return (
    <ChartWrapper>
      {title && <H2>{title}</H2>}
      <Chart
        value={number}
        size={size}
        strokeWidth={size === "xl" ? 14 : 6}
        color={color}
      >
        <span className="fill-tremor-content-emphasis">{value}%</span>
      </Chart>
    </ChartWrapper>
  );
}
