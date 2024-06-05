import styled from "styled-components";

import { BarChart as Chart } from "@tremor/react";

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

export default function BarChart({
  data,
  onChange,
  title,
  categories,
  colors,
}: {
  data: BarChartData[];
  onChange: (v: string) => void;
  title?: string;
  categories: string[];
  colors?: string[];
}) {
  return (
    <ChartWrapper>
      {title && <H2>{title}</H2>}
      <Chart
        data={data}
        categories={categories}
        index="name"
        yAxisWidth={48}
        className="mt-6"
        onValueChange={(v) => onChange(v && v.name ? String(v.name) : "")}
        colors={colors}
      />
    </ChartWrapper>
  );
}
