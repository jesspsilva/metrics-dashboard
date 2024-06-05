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
      expect(badge).toHaveClass(
        "bg-emerald-200 border-emerald-600 text-emerald-800",
      );
    });
  });

  describe("when the label is shift", () => {
    it("should render the correct label and styles", async () => {
      const { container } = render(<Badge label="shift" />);
      const badge = container.firstChild;
      expect(badge?.textContent).toBe("shift");
      expect(badge).toHaveClass("bg-sky-200 border-sky-800 text-sky-800");
    });
  });

  describe("when the label is downtime", () => {
    it("should render the correct label and styles", async () => {
      const { container } = render(<Badge label="downtime" />);
      const badge = container.firstChild;
      expect(badge?.textContent).toBe("downtime");
      expect(badge).toHaveClass("bg-red-200 border-red-800 text-red-800");
    });
  });
});
