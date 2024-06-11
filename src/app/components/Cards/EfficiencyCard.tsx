import { DataCard } from "@components/Cards/CardStyles";
import { useMemo } from "react";
import { getCategoryColor } from "@/app/utils/categories-colors";
import { filterDataByCategory } from "@/app/utils/filter-data-by-category";
import { Color } from "@tremor/react";

import ProgressBar from "@components/ProgressBar/ProgressBar";

export default function EfficiencyCard({ data }: { data: MetricsData[] }) {
  const efficiencyData = useMemo(
    () => filterDataByCategory(data, "efficiency"),
    [data],
  );

  const efficiencyCardData = useMemo(() => {
    const cardData = efficiencyData.find((item) =>
      item.name.toLowerCase().includes("oee"),
    );
    const percentageValue = cardData ? cardData.value * 100 : 0;

    return {
      label: "Efficiency",
      value: percentageValue,
      color: getCategoryColor("efficiency").backgroundColor,
      chartColor: getCategoryColor("efficiency").baseColor,
      description: `The overall equipment efficiency is at ${percentageValue}%`,
    };
  }, [efficiencyData]);

  return (
    <DataCard
      className="flex-col"
      decoration="top"
      decorationColor={
        efficiencyCardData.color ? efficiencyCardData.color : "emerald-600"
      }
    >
      <div>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
          <span>{efficiencyCardData.value}%</span>
          <span>100%</span>
        </p>
        <ProgressBar
          value={efficiencyCardData.value}
          color={efficiencyCardData.chartColor as Color}
        />
      </div>
      <div>
        <h2>{efficiencyCardData.label}</h2>
        <p>{efficiencyCardData.description}</p>
      </div>
    </DataCard>
  );
}
