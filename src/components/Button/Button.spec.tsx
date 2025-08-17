import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
  });

  it("sets the correct type attribute", () => {
    render(<Button type="submit">Submit</Button>);
    const btn = screen.getByRole("button", { name: /submit/i });
    expect(btn).toHaveAttribute("type", "submit");
  });

  it("defaults to type='button' when not provided", () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole("button", { name: /default/i });
    expect(btn).toHaveAttribute("type", "button");
  });
});
