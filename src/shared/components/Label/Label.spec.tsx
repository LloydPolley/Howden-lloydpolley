import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Label from "./Label";

describe("Label", () => {
  it("renders children text", () => {
    render(<Label>Username</Label>);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders as a <label> element", () => {
    render(<Label>Password</Label>);
    expect(screen.getByText("Password").tagName).toBe("LABEL");
  });
});
