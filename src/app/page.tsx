"use client";

import { useState, useEffect } from 'react'

import Table from '@components/Table/Table';
 
export default function Home() {
  const [data, setData] = useState< MetricsData[] | null>(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then(({data}) => {
        setData(data)
        setLoading(false)
      }
    )
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No available data</p>
 
  return (
    <main>
      <Table data={data} />
    </main>
  )
}