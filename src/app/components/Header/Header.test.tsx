import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import Header from "./Header";
import userEvent from "@testing-library/user-event";

const categoriesData = ["efficiency", "shift"] as string[];
const selectedCategory = categoriesData[0];

describe("Header", () => {
	it("should render correctly", () => {
		const { asFragment } = render(
			<Header
				categories={categoriesData}
				selectedCategory={selectedCategory}
				onChange={() => {}}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should display label", async () => {
		render(
			<Header
				categories={categoriesData}
				selectedCategory={selectedCategory}
				onChange={() => {}}
			/>
		);

		expect(
			await screen.findByLabelText("Select a category")
		).toBeInTheDocument();
	});

	it("should render the correct number of categories", async () => {
		render(
			<Header
				categories={categoriesData}
				selectedCategory={selectedCategory}
				onChange={() => {}}
			/>
		);

		const dropdown = within(
			await screen.findByTestId("category-select")
		).getByRole("combobox");
		await userEvent.click(dropdown);
		expect(await screen.findAllByRole("option")).toHaveLength(
			categoriesData.length
		);
	});

	describe("when selecting a category", () => {
		it("should call onChange", async () => {
			const onChange = jest.fn();
			render(
				<Header
					categories={categoriesData}
					selectedCategory={selectedCategory}
					onChange={onChange}
				/>
			);

			const dropdown = within(
				await screen.findByTestId("category-select")
			).getByRole("combobox");
			await userEvent.click(dropdown);
			const option = await screen.findByText("shift");
			await userEvent.click(option);

			expect(onChange).toHaveBeenCalled();
		});
	});
});
