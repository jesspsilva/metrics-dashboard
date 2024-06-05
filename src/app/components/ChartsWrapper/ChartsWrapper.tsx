import { useMemo } from "react";
import { formatNumber } from "@/app/utils/format-number";

import DonutChart from "@components/DonutChart/DonutChart";
import ProgressCircle from "@components/ProgressCircle/ProgressCircle";
import BarChart from "@/app/components/BarChart/BarChart";

export default function ChartsWrapper({
  data,
  category,
  onChange,
}: {
  data: MetricsData[];
  category: string;
  onChange: (v: string | number, type?: FiltersType) => void;
}) {
  const downtimeData = useMemo(
    () =>
      data
        ? data
            .filter((item) => item.category === "downtime")
            .map((item) => ({
              name: item.label,
              value: item.value,
              type: item.type,
            }))
        : [],
    [data],
  );

  const categoryCounts = useMemo(() => {
    const count = {} as Record<string, number>;

    data.forEach((item) => {
      const category = item.category;
      if (count[category]) {
        count[category]++;
      } else {
        count[category] = 1;
      }
    });

    return Object.entries(count).map(([category, itemCount]) => ({
      name: category,
      value: itemCount,
    }));
  }, [data]);

  const equipmentEfficiency = data.filter((item) => item.label === "oee")[0]
    .value;

  const efficiencyData = useMemo(
    () =>
      data
        .filter(
          (item) => item.category === "efficiency" && item.label !== "oee",
        )
        .map((item) => ({
          name: item.label,
          "Loss Value": formatNumber(item.value, item.type),
        })),
    [data],
  );

  const shiftData = useMemo(
    () =>
      data
        .filter((item) => item.category === "shift")
        .map((item) => ({
          name: item.label,
          value: item.value,
          type: item.type,
        })),
    [data],
  );

  const shiftChartData = useMemo(() => {
    const shiftDuration =
      shiftData.find((item) =>
        item.name.toLowerCase().includes("shift duration"),
      )?.value || 0;

    const cleaningTime =
      shiftData.find((item) => item.name.toLowerCase().includes("cleaning"))
        ?.value || 0;

    const shiftHoursToMinutes = Math.floor(shiftDuration * 60);
    const cleaningSecondsToMinutes = Math.floor((cleaningTime % 3600) / 60);

    return [
      {
        name: "Cleaning",
        value: cleaningSecondsToMinutes,
      },
      {
        name: "Other tasks",
        value: shiftHoursToMinutes - cleaningSecondsToMinutes,
      },
    ];
  }, [shiftData]);

  return (
    <>
      <DonutChart
        variant="pie"
        data={categoryCounts}
        onChange={(value) => onChange(value, "categories")}
        title="Categories Distribution"
      />

      {category.toLowerCase() === "downtime" && (
        <DonutChart
          data={downtimeData}
          onChange={onChange}
          type={downtimeData[0].type}
          title="Downtime Distribution"
        />
      )}

      {category.toLowerCase() === "efficiency" && (
        <>
          <ProgressCircle
            value={equipmentEfficiency * 100}
            title="Equipment Efficiency"
          />
          <BarChart
            data={efficiencyData}
            title="Equipment Efficiency"
            onChange={onChange}
            categories={["Loss Value"]}
          />
        </>
      )}

      {category.toLowerCase() === "shift" && (
        <>
          <DonutChart
            data={shiftChartData}
            onChange={(value) => {
              if (value === "Other tasks") {
                onChange("shift", "categories");
                return;
              }

              onChange(value);
            }}
            type="minutes"
            title="Distribution of tasks during the shift"
          />
        </>
      )}
    </>
  );
}
