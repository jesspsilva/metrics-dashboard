import styled from 'styled-components';

const getBadgeColors = (label: string) => {
  switch (label.toLowerCase()) {
    case 'efficiency':
      return {
        backgroundColor: 'var(--light-green)',
        border: 'var(--dark-green)',
        color: 'var(--dark-green)',
      };
    case 'shift':
      return {
        backgroundColor: 'var(--light-blue)',
        border: 'var(--dark-blue)',
        color: 'var(--dark-blue)',
      };
    case 'downtime':
      return {
        backgroundColor: 'var(--light-red)',
        border: 'var(--dark-red)',
        color: 'var(--dark-red)',
      };
    default:
      return {
        backgroundColor: 'var(--light-gray)',
        border: 'var(--dark-gray)',
        color: 'var(--dark-gray)',
      };
  }
};

interface BadgeProps {
  label: string;
}

const BadgeWrapper = styled.span<BadgeProps>`
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 0.9rem;
  text-transform: capitalize;
  color: ${({ label }) => getBadgeColors(label).color};
  background-color: ${({ label }) => getBadgeColors(label).backgroundColor};
  border: 1px solid ${({ label }) => getBadgeColors(label).border};
`;


export default function Badge({label}: BadgeProps) {
  return <BadgeWrapper label={label}>{label}</BadgeWrapper>;
}