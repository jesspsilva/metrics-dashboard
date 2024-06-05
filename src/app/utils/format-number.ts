export const formatNumber = (value: number, type: MetricsType): string => {
  switch (type.toLowerCase()) {
    case "number":
      return new Intl.NumberFormat().format(value);
    case "percentage":
      return new Intl.NumberFormat("pt-PT", { style: "percent" }).format(value);
    case "secs":
      return new Intl.NumberFormat("pt-PT", {
        style: "unit",
        unit: "second",
      }).format(value);
    case "minutes":
      return new Intl.NumberFormat("pt-PT", {
        style: "unit",
        unit: "minute",
      }).format(value);
    case "hours":
      return new Intl.NumberFormat("pt-PT", {
        style: "unit",
        unit: "hour",
      }).format(value);
    default:
      return value.toString();
  }
};

export function fromSecsToMinutes(value: number): number {
  return Math.floor((value % 3600) / 60);
}
