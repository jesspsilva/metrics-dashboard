"use client";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useFetchData } from "@/app/services/useFetchData";

import Table from "@components/Table/Table";
import Header from "@components/Header/Header";
import Overview from "@components/Overview/Overview";
import ChartsWrapper from "@/app/components/ChartsWrapper/ChartsWrapper";
import Spinner from "@/app/components/Spinner/Spinner";

const MetricsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  margin: 20px 0;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;

    > * {
      width: 100%;
    }
  }
`;

const TableCard = styled.div`
  flex: 1;

  @media (min-width: 768px) {
    padding: 40px;

    background: var(--white);
    border-radius: 5px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
  }
`;

const ChartsCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .efficiency-charts {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .chart > div {
    min-width: 390px;

    padding: 20px;
    background: var(--white);
    border-radius: 5px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);

    @media (max-width: 1024px) {
      min-width: 100%;
    }
  }
`;

const TableFooter = styled.footer`
  margin-top: 40px;
  font-weight: 500;
  color: var(--dark-gray);
`;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const { data, isLoading } = useFetchData("/data.json");

  const uniqueCategories = useMemo(
    () => (data ? ["All", ...new Set(data.map((item) => item.category))] : []),
    [data],
  );

  useEffect(() => {
    if (uniqueCategories.length) {
      setSelectedCategory(uniqueCategories[0]);
    }
  }, [uniqueCategories]);

  const filteredData = useMemo(
    () =>
      data
        ? selectedCategory === "All"
          ? data.filter((item) =>
              selectedLabel ? item.label.includes(selectedLabel) : true,
            )
          : data.filter(
              (item) =>
                item.category === selectedCategory &&
                (selectedLabel ? item.label.includes(selectedLabel) : true),
            )
        : [],
    [data, selectedCategory, selectedLabel],
  );

  const changeFilters = (value: string, type: FiltersType = "labels") => {
    if (type === "labels") {
      setSelectedLabel(value);
      return;
    }

    setSelectedCategory(value ? value : "All");
    setSelectedLabel("");
  };

  if (isLoading) return <Spinner />;
  if (!data) return <p>No available data</p>;
  if (!uniqueCategories.length) return <p>No available categories</p>;

  return (
    <main>
      <Header
        categories={uniqueCategories}
        selectedCategory={selectedCategory}
        onChange={(value) => changeFilters(value, "categories")}
        data-testid="table-header"
      />
      <Overview data={data} />
      <MetricsWrapper>
        <ChartsCard>
          <ChartsWrapper
            data={data}
            category={selectedCategory}
            onChange={(value, type) => changeFilters(String(value), type)}
          />
        </ChartsCard>
        <TableCard data-testid="table">
          <Table
            data={filteredData}
            onClick={(value) => changeFilters(value, "categories")}
            enableFiltering={selectedCategory === "All"}
          />
          <TableFooter>
            Showing data {filteredData.length} of {data.length}
          </TableFooter>
        </TableCard>
      </MetricsWrapper>
    </main>
  );
}
