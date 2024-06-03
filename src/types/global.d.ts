export { }

declare global {
  type Category = 'efficiency' | 'shift' | 'downtime'

  type MetricsType = 'number' | 'percentage' | 'secs' | 'hours'

  interface MetricsData {
    id: string
    label: string
    value: number
    type: MetricsType
    description: string
    category: Category
  }
}