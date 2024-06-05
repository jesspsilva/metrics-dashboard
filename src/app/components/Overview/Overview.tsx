import styled from "styled-components";
import { useMemo } from "react";
import { getCategoryColor } from "@/app/utils/categories-colors";
import { filterDataByCategory } from "@/app/utils/filter-data-by-category";
import { fromSecsToMinutes } from "@/app/utils/format-number";

import { Card, Color, ProgressBar, Tracker } from "@tremor/react";
import ProgressCircle from "@/app/components/ProgressCircle/ProgressCircle";

const OverviewWrapper = styled.div`
  padding: 30px 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  @media (max-width: 480px) {
    margin-top: 120px;
  }
`;

const DataCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  padding: 10px 30px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);

  &:not(:first-of-type) > div {
    width: 100%;
  }

  h2 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--dark-blue);
  }

  p {
    font-size: 0.875rem;
    color: var(--gray);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

export default function Overview({ data }: { data: MetricsData[] }) {
  const shiftData = useMemo(() => filterDataByCategory(data, "shift"), [data]);

  const shiftCardData = useMemo(() => {
    const shiftDuration =
      shiftData.find((item) =>
        item.name.toLowerCase().includes("shift duration"),
      )?.value || 0;

    const cleaningTime =
      shiftData.find((item) => item.name.toLowerCase().includes("cleaning"))
        ?.value || 0;

    const shiftHoursToMinutes = Math.floor(shiftDuration * 60);
    const cleaningSecondsToMinutes = Math.floor((cleaningTime % 3600) / 60);

    return {
      label: "Shift time spent cleaning",
      value: Math.round((cleaningSecondsToMinutes / shiftHoursToMinutes) * 100),
      color: getCategoryColor("shift").backgroundColor,
      chartColor: getCategoryColor("shift").chartColor,
      description: `${cleaningSecondsToMinutes} minutes of cleaning out of ${shiftHoursToMinutes} minutes of shift time.`,
    };
  }, [shiftData]);

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

  const createOneHourIntervals = (
    downtimeData: Partial<MetricsData>[],
  ): any => {
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

  const trackData = createOneHourIntervals(downtimeData);

  const downtimeCardData = useMemo(() => {
    return {
      label: "Downtime",
      color: getCategoryColor("downtime").backgroundColor,
      description: `In the last 24 hours, there were ${totalDowntimeMinutes} minutes of downtime`,
    };
  }, [totalDowntimeMinutes]);

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
    <OverviewWrapper data-testid="overview">
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
            value={efficiencyCardData.value as number}
            color={efficiencyCardData.chartColor as Color}
            className="mt-3"
          />
        </div>
        <div>
          <h2>{efficiencyCardData.label}</h2>
          <p>{efficiencyCardData.description}</p>
        </div>
      </DataCard>
    </OverviewWrapper>
  );
}
