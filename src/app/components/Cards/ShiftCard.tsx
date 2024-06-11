import { DataCard } from "@components/Cards/CardStyles";
import { useMemo } from "react";
import { getCategoryColor } from "@/app/utils/categories-colors";
import { filterDataByCategory } from "@/app/utils/filter-data-by-category";

import ProgressCircle from "@components/ProgressCircle/ProgressCircle";
import {
  fromHoursToMinutes,
  fromSecsToMinutes,
} from "@/app/utils/format-number";

export default function ShiftCard({ data }: { data: MetricsData[] }) {
  const shiftData = useMemo(() => filterDataByCategory(data, "shift"), [data]);

  const shiftCardData = useMemo(() => {
    const shiftDuration =
      shiftData.find((item) =>
        item.name.toLowerCase().includes("shift duration"),
      )?.value || 0;

    const cleaningTime =
      shiftData.find((item) => item.name.toLowerCase().includes("cleaning"))
        ?.value || 0;

    const shiftHoursToMinutes = fromHoursToMinutes(shiftDuration);
    const cleaningSecondsToMinutes = fromSecsToMinutes(cleaningTime);

    return {
      label: "Shift time spent cleaning",
      value: Math.round((cleaningSecondsToMinutes / shiftHoursToMinutes) * 100),
      color: getCategoryColor("shift").backgroundColor,
      chartColor: getCategoryColor("shift").chartColor,
      description: `${cleaningSecondsToMinutes} minutes of cleaning out of ${shiftHoursToMinutes} minutes of shift time.`,
    };
  }, [shiftData]);

  return (
    <DataCard
      decoration="top"
      decorationColor={
        shiftCardData.color ? shiftCardData.color : "emerald-600"
      }
    >
      <ProgressCircle
        value={shiftCardData.value}
        color={shiftCardData.chartColor}
        size="md"
      />
      <div>
        <h2>{shiftCardData.label}</h2>
        <p>{shiftCardData.description}</p>
      </div>
    </DataCard>
  );
}
