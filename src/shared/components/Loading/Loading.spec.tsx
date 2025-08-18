import { render, screen } from "@testing-library/react";
import Loading from "./Loading";
import { describe, it, expect } from "vitest";

describe("Loading component", () => {
  it("renders the spinner", () => {
    render(<Loading />);

    const spinner = screen.getByTestId("loading");
    expect(spinner).toBeInTheDocument();
  });
});
