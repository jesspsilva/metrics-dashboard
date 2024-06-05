import { useMemo } from "react";
import { formatNumber } from "@/app/utils/format-number";
import { getCategoryColor } from "@/app/utils/categories-colors";

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
            .map((item, index) => ({
              name: item.label,
              value: item.value,
              type: item.type,
              color: `${getCategoryColor("downtime").baseColor}-${200 + index * 600}`,
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
      color: getCategoryColor(category).chartColor,
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
        color: `${getCategoryColor("shift").baseColor}-200`,
      },
      {
        name: "Other tasks",
        value: shiftHoursToMinutes - cleaningSecondsToMinutes,
        color: `${getCategoryColor("shift").baseColor}-800`,
      },
    ];
  }, [shiftData]);

  return (
    <>
      {category.toLowerCase() === "all" && (
        <DonutChart
          variant="pie"
          data={categoryCounts}
          colors={categoryCounts.map((item) => item.color)}
          onChange={(value) => onChange(value, "categories")}
          title="Categories Distribution"
        />
      )}

      {category.toLowerCase() === "downtime" && (
        <DonutChart
          data={downtimeData}
          onChange={onChange}
          type={downtimeData[0].type}
          title="Downtime Distribution"
          colors={downtimeData.map((item) => item.color)}
        />
      )}

      {category.toLowerCase() === "efficiency" && (
        <>
          <ProgressCircle
            value={equipmentEfficiency * 100}
            title="Equipment Efficiency"
            color={getCategoryColor("efficiency").baseColor}
          />
          <BarChart
            data={efficiencyData}
            title="Loss parameters distribution"
            onChange={onChange}
            categories={["Loss Value"]}
            colors={[getCategoryColor("efficiency").baseColor]}
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
            colors={shiftChartData.map((item) => item.color)}
          />
        </>
      )}
    </>
  );
}
