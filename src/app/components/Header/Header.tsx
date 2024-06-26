import styled from "styled-components";
import { SearchSelect, SearchSelectItem } from "@tremor/react";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 0;

    > * {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: var(--white);
    padding: 10px;
    width: 100%;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
  }
`;

const H1 = styled.h1`
  font-size: 2rem;
  color: var(--dark-blue);

  @media (max-width: 768px) {
    padding: 0 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 0 10px;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .select-category {
    width: auto;
    min-width: 300px;
    text-transform: capitalize;

    input {
      text-transform: capitalize;
    }

    @media (max-width: 640px) {
      min-width: 100%;
    }
  }
`;

const InputLabelStyled = styled.p`
	color: var(--neutral-dark);
	font-weight: 500;
}`;

export default function Header({
  categories,
  selectedCategory,
  onChange,
}: {
  categories: string[];
  selectedCategory: string;
  onChange: (v: string) => void;
}) {
  return (
    <HeaderStyled>
      <H1>Metrics</H1>
      <SelectWrapper>
        <InputLabelStyled id="category-label">
          Select a category
        </InputLabelStyled>
        <SearchSelect
          value={selectedCategory}
          onValueChange={(v) => onChange(v)}
          className="select-category"
          data-testid="category-select"
          defaultValue={categories[0]}
          enableClear={false}
        >
          {categories.map((category, index) => {
            return (
              <SearchSelectItem
                key={index}
                value={category}
                data-testid="category-option"
              >
                {category}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </SelectWrapper>
    </HeaderStyled>
  );
}
