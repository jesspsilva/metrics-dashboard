import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import Header from "./Header";
import userEvent from "@testing-library/user-event";

const defaultTestProps = {
  categories: ["efficiency", "shift"],
  selectedCategory: "efficiency",
  onChange: () => {},
};

const renderComponent = (props = {}) => {
  const mergedProps = { ...defaultTestProps, ...props };
  return render(<Header {...mergedProps} />);
};

describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display label", async () => {
    renderComponent();

    expect(await screen.findByText("Select a category")).toBeInTheDocument();
  });

  it("should render the correct number of categories", async () => {
    renderComponent();

    const select = await screen.findByTestId("category-select");
    const dropdown = within(select).getByRole("combobox");
    await userEvent.click(dropdown);
    expect(await within(select).findAllByRole("option")).toHaveLength(
      defaultTestProps.categories.length,
    );
  });

  describe("when selecting a category", () => {
    it("should call onChange", async () => {
      const onChange = jest.fn();
      renderComponent({ onChange });

      const select = await screen.findByTestId("category-select");
      const dropdown = within(select).getByRole("combobox");

      await userEvent.click(dropdown);

      const shiftOption = await within(select).findByText("shift");
      await userEvent.click(shiftOption);

      expect(onChange).toHaveBeenCalled();
    });
  });
});
