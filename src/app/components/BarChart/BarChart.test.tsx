import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

// Added this mock because the ResponsiveContainer component from recharts
// is causing an error when running the tests
// Reference: https://github.com/recharts/recharts/issues/727
jest.mock("recharts", () => ({
  ...jest.requireActual("recharts"),
  ResponsiveContainer: jest
    .fn()
    .mockImplementation((props: any) => <div {...props} />),
}));

import BarChart from "./BarChart";

const defaultTestProps = {
  data: [
    {
      name: "Total",
      "% value": "10",
    },
    {
      name: "Cleaning",
      "% value": "20",
    },
  ],
  title: "Bar Chart Title",
  onChange: () => {},
  categories: ["% value"],
};

const renderComponent = (props = {}) => {
  const mergedProps = { ...defaultTestProps, ...props };
  return render(<BarChart {...mergedProps} />);
};

describe("BarChart", () => {
  it("should render correctly", () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("when there's a title", () => {
    it("should display the title", () => {
      const { queryByText } = renderComponent();

      expect(queryByText(defaultTestProps.title)).toBeInTheDocument();
    });
  });

  describe("when there's no title", () => {
    it("should not display the title", () => {
      const { queryByText } = renderComponent({ title: "" });

      expect(queryByText(defaultTestProps.title)).not.toBeInTheDocument();
    });
  });
});
