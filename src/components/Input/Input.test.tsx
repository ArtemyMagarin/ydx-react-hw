import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";

test("renders input", () => {
	render(<Input data-testid="test" />);
	const input = screen.getByTestId("test");
	expect(input).toBeInTheDocument();
});

test("input with type number receives only numbers", () => {
	render(<Input type="number" data-testid="test" />);
	const input = screen.getByTestId("test") as HTMLInputElement;
	expect(input).toBeInTheDocument();
	fireEvent.change(input, { target: { value: "asd" } });
	expect(input.value).toBe("");
	fireEvent.change(input, { target: { value: "123" } });
	expect(input.value).toBe("123");
});
