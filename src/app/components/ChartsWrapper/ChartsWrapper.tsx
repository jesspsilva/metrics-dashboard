import { useMemo } from "react";

import DonutChart from "@components/DonutChart/DonutChart";

export default function ChartsWrapper({
  data,
  category,
  onChange,
}: {
  data: MetricsData[];
  category: string;
  onChange: (v: string, type?: FiltersType) => void;
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

  return (
    <>
      <DonutChart
        variant="pie"
        data={categoryCounts}
        onChange={(value) => onChange(value, "categories")}
        title="Categories Distribution"
      />

      {(category.toLowerCase() === "downtime" ||
        category.toLowerCase() === "all") && (
        <DonutChart
          data={downtimeData}
          onChange={onChange}
          type={downtimeData[0].type}
          title="Downtime Distribution"
        />
      )}
    </>
  );
}
