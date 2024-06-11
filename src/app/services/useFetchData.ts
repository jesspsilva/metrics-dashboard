import { useState, useEffect } from 'react';

export const useFetchData = (url: string) => {
  const [data, setData] = useState<MetricsData[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // Simulate a slow network
        setTimeout(() => {
          setData(result.data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
};