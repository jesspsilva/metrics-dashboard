import styled from "styled-components";
import Select from "@mui/material/Select";
import { styled as MaterialStyled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const HeaderStyled = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
		padding: 20px 0 40px;

		> * {
			width: 100%;
		}
	}
`;

const H1 = styled.h1`
	font-size: 2rem;
	color: var(--dark-blue);

	@media (max-width: 768px) {
		padding: 0 0 20px;
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
`;

const CategorySelect = MaterialStyled(Select)(() => ({
	width: "300px",
	padding: 0,
	textTransform: "capitalize",
	color: "var(--neutral-dark)",
	fontWeight: 500,
	boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.02)",
	"& fieldset": {
		border: "1px solid var(--light-gray)",
		top: 0,
	},
	"& fieldset legend": {
		display: "none",
	},
	"& .MuiSelect-select": {
		padding: "14px",
	},
	"&:hover fieldset": {
		borderColor: "var(--gray) !important",
	},
	"&.Mui-focused fieldset": {
		border: "1px solid var(--light-blue) !important",
	},
	"@media (max-width: 768px)": {
		width: "100%",
	},
}));

const MenuItemStyled = MaterialStyled(MenuItem)(() => ({
	textTransform: "capitalize",
}));

const InputLabelStyled = MaterialStyled(InputLabel)(() => ({
	color: "var(--neutral-dark)",
	fontWeight: 500,
}));

export default function Header({
	categories,
	selectedCategory,
	onChange,
}: {
	categories: string[];
	selectedCategory: string;
	onChange: (event: any) => void;
}) {
	return (
		<HeaderStyled>
			<H1>Metrics</H1>
			<SelectWrapper>
				<InputLabelStyled id="category-label">
					Select a category
				</InputLabelStyled>
				<CategorySelect
					id="category-select"
					labelId="category-label"
					value={selectedCategory}
					onChange={onChange}
					label={selectedCategory}
					className="select-category"
					data-testid="category-select"
				>
					{categories.map((category, index) => {
						return (
							<MenuItemStyled
								key={index}
								value={category}
								data-testid="category-option"
							>
								{category}
							</MenuItemStyled>
						);
					})}
				</CategorySelect>
			</SelectWrapper>
		</HeaderStyled>
	);
}
