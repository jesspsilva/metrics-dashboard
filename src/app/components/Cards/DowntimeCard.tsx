import { DataCard } from "@components/Cards/CardStyles";
import { useMemo } from "react";
import { getCategoryColor } from "@/app/utils/categories-colors";
import { filterDataByCategory } from "@/app/utils/filter-data-by-category";
import { fromSecsToMinutes } from "@/app/utils/format-number";

import { Tracker } from "@tremor/react";

export default function DowntimeCard({ data }: { data: MetricsData[] }) {
  const downtimeData = useMemo(
    () => filterDataByCategory(data, "downtime"),
    [data],
  ) as Partial<MetricsData>[];

  const totalDowntimeMinutes = useMemo(() => {
    return downtimeData.reduce(
      (total, current) => total + fromSecsToMinutes(current.value || 0),
      0,
    );
  }, [downtimeData]);

  const createOneHourIntervals = (): { color: string; tooltip: string }[] => {
    const numIntervals = 60;
    const downtimeIntervals = Array(numIntervals).fill(0);

    const intervalsWithDowntime = Math.round(
      (totalDowntimeMinutes / numIntervals) * numIntervals,
    );

    for (let i = 0; i < intervalsWithDowntime; i++) {
      downtimeIntervals[i] = 1;
    }

    const intervals = downtimeIntervals.map((isDowntime) => {
      const color = isDowntime ? "red" : "emerald";
      const tooltip = isDowntime ? "Downtime" : "Operational";
      return { color, tooltip };
    });

    return intervals;
  };

  const trackData = createOneHourIntervals();

  const downtimeCardData = useMemo(() => {
    return {
      label: "Downtime",
      color: getCategoryColor("downtime").backgroundColor,
      description: `In the last hour, there were ${totalDowntimeMinutes} minutes of downtime`,
    };
  }, [totalDowntimeMinutes]);

  return (
    <DataCard
      className="flex-col"
      decoration="top"
      decorationColor={
        downtimeCardData.color ? downtimeCardData.color : "emerald-600"
      }
    >
      <Tracker data={trackData} className="mt-2" />
      <div>
        <h2>{downtimeCardData.label}</h2>
        <p>{downtimeCardData.description}</p>
      </div>
    </DataCard>
  );
}
