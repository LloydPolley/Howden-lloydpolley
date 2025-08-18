import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Error from "./Error";

describe("Error", () => {
  it("renders nothing when error is null", () => {
    render(<Error error={null} />);
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  it("renders the error message when provided", () => {
    render(<Error error="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
