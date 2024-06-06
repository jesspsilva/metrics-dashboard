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

const data = [
  {
    name: "Total",
    "% value": "10",
  },
  {
    name: "Cleaning",
    "% value": "20",
  },
];

const title = "Bar Chart Title";
const categories = ["% value"];

describe("BarChart", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <BarChart
        data={data}
        title={title}
        onChange={() => {}}
        categories={categories}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe("when there's a title", () => {
    it("should display the title", () => {
      const { queryByText } = render(
        <BarChart
          data={data}
          title={title}
          onChange={() => {}}
          categories={categories}
        />,
      );

      expect(queryByText(title)).toBeInTheDocument();
    });
  });

  describe("when there's no title", () => {
    it("should not display the title", () => {
      const { queryByText } = render(
        <BarChart data={data} onChange={() => {}} categories={categories} />,
      );

      expect(queryByText(title)).not.toBeInTheDocument();
    });
  });
});
