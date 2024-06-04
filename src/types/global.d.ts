export { }

declare global {
  type Category = 'efficiency' | 'shift' | 'downtime'

  type MetricsType = 'number' | 'percentage' | 'secs' | 'hours'

  type StatsType = 'success' | 'danger' | 'default'

  interface MetricsData {
    id: string
    label: string
    value: number
    type: MetricsType
    description: string
    category: Category
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
}