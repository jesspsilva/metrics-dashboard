import { getCategoryColor } from "@/app/utils/categories-colors";
import styled from "styled-components";

interface BadgeProps {
  label: string;
}

const BadgeWrapper = styled.span<BadgeProps>`
  display: inline-block;
  min-width: 80px;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
  text-transform: capitalize;
  border: 1px solid;
`;

export default function Badge({ label }: BadgeProps) {
  const colors = getCategoryColor(label);

  return (
    <BadgeWrapper
      label={label}
      className={`bg-${colors.backgroundColor} border-${colors.border} text-${colors.color}`}
    >
      {label}
    </BadgeWrapper>
  );
}
