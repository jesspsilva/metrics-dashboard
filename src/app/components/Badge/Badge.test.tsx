import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import "jest-styled-components";

import Badge from "./Badge";

const defaultTestProps = {
  label: "efficiency",
};

const renderComponent = (props = {}) => {
  const mergedProps = { ...defaultTestProps, ...props };
  return render(<Badge {...mergedProps} />);
};

describe("Badge", () => {
  it("should render correctly", () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("when the label is efficiency", () => {
    it("should render the correct label and styles", async () => {
      const { container } = renderComponent();
      const badge = container.firstChild;
      expect(badge?.textContent).toBe("efficiency");
      expect(badge).toHaveClass(
        "bg-emerald-200 border-emerald-800 text-emerald-800",
      );
    });
  });

  describe("when the label is shift", () => {
    it("should render the correct label and styles", async () => {
      const { container } = renderComponent({ label: "shift" });
      const badge = container.firstChild;
      expect(badge?.textContent).toBe("shift");
      expect(badge).toHaveClass("bg-sky-200 border-sky-800 text-sky-800");
    });
  });

  describe("when the label is downtime", () => {
    it("should render the correct label and styles", async () => {
      const { container } = renderComponent({ label: "downtime" });
      const badge = container.firstChild;
      expect(badge?.textContent).toBe("downtime");
      expect(badge).toHaveClass("bg-red-200 border-red-800 text-red-800");
    });
  });
});
