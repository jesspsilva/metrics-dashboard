import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
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

const category = "efficiency";

describe("ChartsWrapper", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <ChartsWrapper data={data} category={category} onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe("when the category is downtime", () => {
    it("should render the correct downtime data", () => {
      const { container } = render(
        <ChartsWrapper data={data} category="downtime" onChange={() => {}} />,
      );

      const donutChart = container.querySelector(
        "[data-testid='downtime-chart']",
      );

      expect(donutChart).toBeInTheDocument();
      expect(donutChart).toHaveTextContent("Downtime Distribution");
      expect(donutChart?.children).toHaveLength(1);
    });
  });

  describe("when the category is efficiency", () => {
    it("should render the correct efficiency data", () => {
      const { container } = render(
        <ChartsWrapper data={data} category="efficiency" onChange={() => {}} />,
      );

      const efficiencyCharts = container.querySelector(".efficiency-charts");

      expect(efficiencyCharts?.children).toHaveLength(2);
    });
  });

  describe("when the category is shift", () => {
    it("should render the correct shift data", () => {
      const { container } = render(
        <ChartsWrapper data={data} category="shift" onChange={() => {}} />,
      );

      const donutChart = container.querySelector("[data-testid='shift-chart']");

      expect(donutChart).toBeInTheDocument();
      expect(donutChart).toHaveTextContent(
        "Distribution of tasks during the shift",
      );
      expect(donutChart?.children).toHaveLength(1);
    });
  });

  describe("when the category is all", () => {
    it("should render all categories chart data", () => {
      const { container } = render(
        <ChartsWrapper data={data} category="all" onChange={() => {}} />,
      );

      const charts = container.querySelector("[data-testid='all-chart']");

      expect(charts?.children).toHaveLength(1);
    });
  });
});
