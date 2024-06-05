import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Table from "./Table";
import { metricsData as data } from "@/app/utils/__mocks__/tests-data";

describe("Table", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Table data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the correct number of rows", () => {
    render(<Table data={data} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(data.length + 1);
  });

  it("should render the correct number of columns", () => {
    render(<Table data={data} />);
    const rows = screen.getAllByRole("row");
    const columns = rows[0].querySelectorAll("th");
    expect(columns).toHaveLength(4);
  });

  describe("when table label is available", () => {
    it("should render the label", () => {
      const { container } = render(<Table data={data} />);
      const label = container.querySelectorAll('[data-label="Label"]');
      expect(label[0]).toHaveTextContent("oee");
      expect(label[1]).toHaveTextContent("Speed loss");
      expect(label[2]).toHaveTextContent("Cleaning in shift");
      expect(label[3]).toHaveTextContent("Shift duration");
    });
  });

  describe("when table label is not available", () => {
    it("should render a dash", () => {
      const { container } = render(<Table data={data} />);
      const label = container.querySelectorAll('[data-label="Label"]');
      expect(label[4]).toHaveTextContent("-");
    });
  });

  describe("when table value is a percentage", () => {
    it("should format the number correctly", () => {
      const { container } = render(<Table data={data} />);
      const value = container.querySelectorAll('[data-label="Value"]')[0];
      expect(value).toHaveTextContent("68%");
    });
  });

  describe("when table value is a number", () => {
    it("should format the number correctly", () => {
      const { container } = render(<Table data={data} />);
      const value = container.querySelectorAll('[data-label="Value"]')[1];
      expect(value).toHaveTextContent("-10.5");
    });
  });

  describe("when table value is in seconds", () => {
    it("should format the number correctly", () => {
      const { container } = render(<Table data={data} />);
      const value = container.querySelectorAll('[data-label="Value"]')[2];
      expect(value).toHaveTextContent("2280 s");
    });
  });

  describe("when table value is in hours", () => {
    it("should format the number correctly", () => {
      const { container } = render(<Table data={data} />);
      const value = container.querySelectorAll('[data-label="Value"]')[3];
      expect(value).toHaveTextContent("8 h");
    });
  });

  describe("when table value is not available", () => {
    it("should render a dash", () => {
      const { container } = render(<Table data={data} />);
      const value = container.querySelectorAll('[data-label="Value"]')[4];
      expect(value).toHaveTextContent("-");
    });
  });

  describe("when table description is available", () => {
    it("should render the description", () => {
      const { container } = render(<Table data={data} />);
      const description = container.querySelectorAll(
        '[data-label="Description"]',
      );
      expect(description[0]).toHaveTextContent(
        "The overall equipment efficiency in %",
      );
      expect(description[1]).toHaveTextContent("The line speed loss");
      expect(description[2]).toHaveTextContent(
        "Time spent (in seconds) cleaning the machines during the last shift",
      );
      expect(description[3]).toHaveTextContent("Last shift duration in hours");
    });
  });

  describe("when table description is not available", () => {
    it("should render a dash", () => {
      const { container } = render(<Table data={data} />);
      const description = container.querySelectorAll(
        '[data-label="Description"]',
      );
      expect(description[4]).toHaveTextContent("-");
    });
  });

  describe("when table category is available", () => {
    it("should render the category", () => {
      const { container } = render(<Table data={data} />);
      const category = container.querySelectorAll('[data-label="Category"]');
      expect(category[0].querySelector("span")).toHaveTextContent("efficiency");
      expect(category[1].querySelector("span")).toHaveTextContent("efficiency");
      expect(category[2].querySelector("span")).toHaveTextContent("shift");
      expect(category[3].querySelector("span")).toHaveTextContent("shift");
    });
  });

  describe("when table category is not available", () => {
    it("should render a dash", () => {
      const { container } = render(<Table data={data} />);
      const category = container.querySelectorAll('[data-label="Category"]');
      expect(category[4]).toHaveTextContent("-");
    });
  });
});
