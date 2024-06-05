export {};

declare global {
  type Category = "efficiency" | "shift" | "downtime";

  type MetricsType = "number" | "percentage" | "secs" | "hours" | "minutes";

  type StatsType = "success" | "danger" | "default";

  type DonutChartVariant = "donut" | "pie";

  type FiltersType = "categories" | "labels";

  interface MetricsData {
    id: string;
    label: string;
    value: number;
    type: MetricsType;
    description: string;
    category: Category;
  }

  interface StatsItem {
    label: string;
    value: string;
    category: string;
    statType: string;
  }

  interface StatsData {
    [key: string]: StatsItem[];
  }

  interface ChartData {
    name: string;
    value: number;
  }

  interface BarChartData {
    name: string;
    [key: string]: number | string;
  }
}
