import styled from "styled-components";
import { Card } from "@tremor/react";

export const DataCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  padding: 10px 30px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);

  &:not(:first-of-type) > div {
    width: 100%;
  }

  h2 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--dark-blue);
  }

  p {
    font-size: 0.875rem;
    color: var(--gray);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;