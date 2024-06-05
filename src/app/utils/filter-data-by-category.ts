export const filterDataByCategory = (data: any[], category: string) => {
  return data
    .filter((item) => item.category === category)
    .map((item) => ({
      name: item.label,
      value: item.value,
      type: item.type,
    }));
};
