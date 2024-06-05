import styled from "styled-components";
import StatsCard from "@components/StatsCard/StatsCard";

const OverviewWrapper = styled.div`
  padding: 30px 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    padding: 10px 0 20px;
    grid-template-columns: 1fr 1fr;
  }
`;

export default function Overview({ data }: { data: StatsData }) {
  const downtimeData = data.downtime.slice(0, 2);
  const shiftData = data.shift.slice(0, 2);
  const efficiencyData = data.efficiency.slice(0, 2);

  return (
    <OverviewWrapper>
      {downtimeData.map((item, index) => (
        <StatsCard data={item} key={`${item.label} + ${index}`} />
      ))}
      {shiftData.map((item, index) => (
        <StatsCard data={item} key={`${item.label} + ${index}`} />
      ))}
      {efficiencyData.map((item, index) => (
        <StatsCard data={item} key={`${item.label} + ${index}`} />
      ))}
    </OverviewWrapper>
  );
}
