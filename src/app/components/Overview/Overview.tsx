import styled from "styled-components";

import ShiftCard from "@components/Cards/ShiftCard";
import DowntimeCard from "@components/Cards/DowntimeCard";
import EfficiencyCard from "@components/Cards/EfficiencyCard";

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

export default function Overview({ data }: { data: MetricsData[] }) {
  return (
    <OverviewWrapper data-testid="overview">
      <ShiftCard data={data} />
      <DowntimeCard data={data} />
      <EfficiencyCard data={data} />
    </OverviewWrapper>
  );
}
