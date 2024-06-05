import styled from "styled-components";
import { formatNumber } from "@/app/utils/format-number";
import { DonutChart as Chart, Legend } from "@tremor/react";

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

const LegendWrapper = styled(Legend)`
  text-transform: capitalize;

  div {
    justify-content: center;
  }
`;

const H2 = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
`;

export default function DonutChart({
  data,
  onChange,
  variant = "donut",
  colors,
  type = "number",
  title,
}: {
  data: ChartData[];
  onChange: (v: string) => void;
  variant?: DonutChartVariant;
  colors?: string[];
  type?: MetricsType;
  title?: string;
}) {
  return (
    <ChartWrapper>
      {title && <H2>{title}</H2>}
      <Chart
        data={data}
        variant={variant}
        onValueChange={(v) => onChange(v && v.name ? v.name : "")}
        index="name"
        category="value"
        className="w-80"
        valueFormatter={(value) => formatNumber(value, type)}
        colors={colors}
      />
      <LegendWrapper
        categories={data.map((item) => item.name)}
        colors={colors}
        className="mx-auto"
      />
    </ChartWrapper>
  );
}
