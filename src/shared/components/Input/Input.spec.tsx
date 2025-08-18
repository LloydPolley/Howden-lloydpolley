import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Enter amount" />);
    const input = screen.getByPlaceholderText("Enter amount");
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  it("calls onChange when value changes", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");

    fireEvent.change(input, { target: { value: "123" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
