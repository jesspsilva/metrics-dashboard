import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import "jest-styled-components";

import Badge from "./Badge";

describe("Badge", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Badge label="efficiency" />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe("when the label is efficiency", () => {
    it("should render the correct label and styles", async () => {
      const { container } = render(<Badge label="efficiency" />);
      const badge = container.firstChild;
      expect(badge?.textContent).toBe("efficiency");
      expect(badge).toHaveStyleRule("background-color", "var(--light-green)");
      expect(badge).toHaveStyleRule("border", "1px solid var(--dark-green)");
      expect(badge).toHaveStyleRule("color", "var(--dark-green)");
    });
  });

  describe("when the label is shift", () => {
    it("should render the correct label and styles", async () => {
      const { container } = render(<Badge label="shift" />);
      const badge = container.firstChild;
      expect(badge?.textContent).toBe("shift");
      expect(badge).toHaveStyleRule("background-color", "var(--light-blue)");
      expect(badge).toHaveStyleRule("border", "1px solid var(--dark-blue)");
      expect(badge).toHaveStyleRule("color", "var(--dark-blue)");
    });
  });

  describe("when the label is downtime", () => {
    it("should render the correct label and styles", async () => {
      const { container } = render(<Badge label="downtime" />);
      const badge = container.firstChild;
      expect(badge?.textContent).toBe("downtime");
      expect(badge).toHaveStyleRule("background-color", "var(--light-red)");
      expect(badge).toHaveStyleRule("border", "1px solid var(--dark-red)");
      expect(badge).toHaveStyleRule("color", "var(--dark-red)");
    });
  });

  describe("when is any other label", () => {
    it("should render the correct label and styles", async () => {
      const { container } = render(<Badge label="unknown" />);
      const badge = container.firstChild;
      expect(badge?.textContent).toBe("unknown");
      expect(badge).toHaveStyleRule("background-color", "var(--light-gray)");
      expect(badge).toHaveStyleRule("border", "1px solid var(--dark-gray)");
      expect(badge).toHaveStyleRule("color", "var(--dark-gray)");
    });
  });
});
