import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ConversionResult from "./ConversionResult";

describe("ConversionResult", () => {
  it("renders the label", () => {
    render(<ConversionResult result={123.45} />);
    expect(screen.getByText(/converted amount/i)).toBeInTheDocument();
  });

  it("renders the result value", () => {
    render(<ConversionResult result={987.65} />);
    expect(screen.getByText("987.65")).toBeInTheDocument();
  });
});
