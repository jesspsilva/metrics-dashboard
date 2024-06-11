import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChartsWrapper from "./ChartsWrapper";
import { metricsData as data } from "@/app/utils/__mocks__/tests-data";

// Added this mock because the ResponsiveContainer component from recharts
// is causing an error when running the tests
// Reference: https://github.com/recharts/recharts/issues/727
jest.mock("recharts", () => ({
  ...jest.requireActual("recharts"),
  ResponsiveContainer: jest
    .fn()
    .mockImplementation((props: any) => <div {...props} />),
}));

const defaultTestProps = {
  data,
  category: "efficiency",
  onChange: () => {},
};

const renderComponent = (props = {}) => {
  const mergedProps = { ...defaultTestProps, ...props };
  return render(<ChartsWrapper {...mergedProps} />);
};

describe("ChartsWrapper", () => {
  it("should render correctly", () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("when the category is downtime", () => {
    it("should render the correct downtime data", async () => {
      renderComponent({ category: "downtime" });

      const donutChart = await screen.findByTestId("downtime-chart");

      expect(donutChart).toBeInTheDocument();
      expect(donutChart).toHaveTextContent("Downtime Distribution");
      expect(donutChart?.children).toHaveLength(1);
    });
  });

  describe("when the category is efficiency", () => {
    it("should render the correct efficiency data", async () => {
      renderComponent({ category: "efficiency" });

      const efficiencyCharts = await screen.findByTestId("efficiency-charts");

      expect(efficiencyCharts?.children).toHaveLength(2);
    });
  });

  describe("when the category is shift", () => {
    it("should render the correct shift data", async () => {
      renderComponent({ category: "shift" });

      const donutChart = await screen.findByTestId("shift-chart");

      expect(donutChart).toBeInTheDocument();
      expect(donutChart).toHaveTextContent(
        "Distribution of tasks during the shift",
      );
      expect(donutChart?.children).toHaveLength(1);
    });
  });

  describe("when the category is all", () => {
    it("should render all categories chart data", async () => {
      renderComponent({ category: "All" });

      const charts = await screen.findByTestId("all-chart");

      expect(charts?.children).toHaveLength(1);
    });
  });
});
