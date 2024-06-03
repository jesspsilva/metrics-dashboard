export { }

declare global {
  type Category = 'efficiency' | 'shift' | 'downtime'

  interface MetricsData {
    id: string
    label: string
    value: number
    type: string
    description: string
    category: Category
  }
}