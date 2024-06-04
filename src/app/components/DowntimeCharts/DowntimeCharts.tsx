import styled from "styled-components";
import { formatNumber } from "@/app/utils/format-number";
import { DonutChart, Legend } from "@tremor/react";

const ChartWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
`;

const LegendWrapper = styled(Legend)`
	div {
		justify-content: center;
	}
`;

export default function DowntimeCharts({
	data,
	onChange,
}: {
	data: ChartData[];
	onChange: (v: string) => void;
}) {
	return (
		<ChartWrapper>
			<DonutChart
				data={data}
				variant="donut"
				onValueChange={(v) => onChange(v && v.name ? v.name : "")}
				colors={["blue-900", "blue-500"]}
				index="name"
				category="value"
				className="w-80"
				valueFormatter={(v) => formatNumber(v, "secs")}
			/>
			<LegendWrapper
				categories={data.map((item) => item.name)}
				colors={["blue-900", "blue-500"]}
				className="mx-auto"
			/>
		</ChartWrapper>
	);
}
