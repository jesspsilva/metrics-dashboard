"use client";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { formatNumber } from "@/app/utils/format-number";

import Table from "@components/Table/Table";
import Header from "@components/Header/Header";
import Overview from "@components/Overview/Overview";
import ChartsWrapper from "@/app/components/ChartsWrapper/ChartsWrapper";

const MetricsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 20px;

	margin: 20px 0;

	.data-table {
		flex: 1;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 40px;
	}
`;

const MetricsCard = styled.div`
	@media (min-width: 768px) {
		padding: 40px;

		background: var(--white);
		border-radius: 5px;
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
	}

	&.charts {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 80px;
		min-width: 390px;

		padding: 40px;
		background: var(--white);
		border-radius: 5px;
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
	}
`;

const TableFooter = styled.footer`
	margin-top: 40px;
	font-weight: 500;
	color: var(--dark-gray);
`;

export default function Home() {
	const [data, setData] = useState<MetricsData[] | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [selectedLabel, setSelectedLabel] = useState<string>("");

	const uniqueCategories = useMemo(
		() => (data ? ["All", ...new Set(data.map((item) => item.category))] : []),
		[data]
	);
	const filteredData = useMemo(
		() =>
			data
				? selectedCategory === "All"
					? data.filter((item) =>
							selectedLabel ? item.label.includes(selectedLabel) : true
					  )
					: data.filter(
							(item) =>
								item.category === selectedCategory &&
								(selectedLabel ? item.label.includes(selectedLabel) : true)
					  )
				: [],
		[data, selectedCategory, selectedLabel]
	);

	const statsData = useMemo(
		() =>
			data
				? Object.groupBy(
						data.map(({ label, value, type, category }) => ({
							label,
							value: formatNumber(value, type),
							category,
							statType:
								category === "downtime"
									? "danger"
									: type === "percentage" && value > 0.6
									? "success"
									: "default",
						})),
						({ category }) => category
				  )
				: ({} as StatsData),
		[data]
	);

	useEffect(() => {
		fetch("/data.json")
			.then((response) => response.json())
			.then(({ data }) => {
				setData(data);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (uniqueCategories.length) {
			setSelectedCategory(uniqueCategories[0]);
		}
	}, [uniqueCategories]);

	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No available data</p>;
	if (!uniqueCategories.length) return <p>No available categories</p>;

	const changeFilters = (value: string, type: FiltersType = "labels") => {
		return type === "categories"
			? setSelectedCategory(value ? value : "All")
			: setSelectedLabel(value);
	};

	return (
		<main>
			<Header
				categories={uniqueCategories}
				selectedCategory={selectedCategory}
				onChange={(value) => setSelectedCategory(value)}
				data-testid="table-header"
			/>
			<Overview data={statsData} />
			<MetricsWrapper>
				<MetricsCard className="charts">
					<ChartsWrapper
						data={data}
						category={selectedCategory}
						onChange={changeFilters}
					/>
				</MetricsCard>
				<MetricsCard className="data-table">
					<Table data={filteredData} />
					<TableFooter>
						Showing data {filteredData.length} of {data.length}
					</TableFooter>
				</MetricsCard>
			</MetricsWrapper>
		</main>
	);
}
