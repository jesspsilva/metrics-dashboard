import styled from "styled-components";

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;

  background: var(--white);
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1rem;
    color: var(--dark-gray);
    font-weight: 500;
  }

  p {
    font-size: 1.5rem;
    color: var(--dark-blue);
    font-weight: 500;
  }

  .danger {
    color: var(--danger);
  }

  .success {
    color: var(--success);
  }

  .default {
    color: var(--dark-blue);
  }
`;

export default function StatsCard({ data }: { data: StatsItem }) {
  return (
    <Card key={data.label}>
      <h2>{data.label}</h2>
      <p className={data.statType ? data.statType : "default"}>{data.value}</p>
    </Card>
  );
}
