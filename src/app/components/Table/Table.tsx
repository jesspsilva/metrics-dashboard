import styled from "styled-components";

import Badge from "@components/Badge/Badge";
import { formatNumber } from "@/app/utils/format-number";

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid var(--light-gray);

  @media (max-width: 768px) {´
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;

const TableHeader = styled.th`
  padding: 20px;

  text-align: left;
  color: var(--gray);
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
`;

const TableRow = styled.tr`
  @media (max-width: 768px) {
    display: block;
    border: 1px solid var(--light-gray);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);

    &:not(:last-of-type) {
      margin-bottom: 4rem;
      background: var(--white);
    }
  }
`;

const TableData = styled.td`
  font-weight: 400;
  padding: 20px;
  text-align: left;
  font-size: 1rem;
  color: var(--dark-blue);
  line-height: 1.5;

  border-bottom: 1px solid var(--light-gray);

  &:first-child {
    text-transform: capitalize;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 12px;

    font-size: 0.9em;
    text-align: right;

    &::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
    }

    &:last-child {
      border-bottom: 0;
    }
  }
`;

export default function Table({ data }: { data: MetricsData[] }) {
  return (
    <TableWrapper>
      <TableHead>
        <tr>
          <TableHeader>Label</TableHeader>
          <TableHeader>Value</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Category</TableHeader>
        </tr>
      </TableHead>
      <tbody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableData data-label="Label">
              {item.label ? item.label : "-"}
            </TableData>
            <TableData data-label="Value">
              {item.value ? formatNumber(item.value, item.type) : "-"}
            </TableData>
            <TableData data-label="Description">
              {item.description ? item.description : "-"}
            </TableData>
            <TableData data-label="Category">
              {item.category ? <Badge label={item.category} /> : "-"}
            </TableData>
          </TableRow>
        ))}
      </tbody>
    </TableWrapper>
  );
}
