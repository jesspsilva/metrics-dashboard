"use client";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { formatNumber } from "@/app/utils/format-number";

import Table from "@components/Table/Table";
import Header from "@components/Header/Header";
import Overview from "@components/Overview/Overview";

const TableWrapper = styled.div`
	margin: 20px 0;

	@media (min-width: 768px) {
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

	const uniqueCategories = useMemo(
		() => (data ? ["All", ...new Set(data.map((item) => item.category))] : []),
		[data]
	);
	const filteredData = useMemo(
		() =>
			data
				? selectedCategory === "All"
					? data
					: data.filter((item) => item.category === selectedCategory)
				: [],
		[data, selectedCategory]
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

	// Event is of type any because of material ui problem: https://mui.com/material-ui/guides/typescript/#handling-value-and-event-handlers
	const handleSelectChange = (event: any) => {
		setSelectedCategory(event.target.value as string);
	};

	return (
		<main>
			<Header
				categories={uniqueCategories}
				selectedCategory={selectedCategory}
				onChange={handleSelectChange}
				data-testid="table-header"
			/>
			<Overview data={statsData} />
			<TableWrapper>
				<Table data={filteredData} />
				<TableFooter>
					Showing data {filteredData.length} of {data.length}
				</TableFooter>
			</TableWrapper>
		</main>
	);
}
