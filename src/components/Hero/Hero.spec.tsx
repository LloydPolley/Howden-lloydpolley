import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders the title", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: /currency converter/i })
    ).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Hero />);
    expect(screen.getByText(/real-time exchange rates/i)).toBeInTheDocument();
  });
});
