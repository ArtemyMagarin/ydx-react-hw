import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from ".";

test("renders button with default color and size", () => {
	render(<Button>button</Button>);
	const button = screen.getByText("button");
	expect(button).toBeInTheDocument();
	expect(button).toHaveClass("size_default");
	expect(button).toHaveClass("variant_primary");
});

test("renders button with custom color and size", () => {
	render(
		<Button size="small" variant="secondary">
			button
		</Button>
	);
	const button = screen.getByText("button");
	expect(button).toHaveClass("size_small");
	expect(button).toHaveClass("variant_secondary");
});

test("renders button with custom className", () => {
	render(<Button className="custom-classname">button</Button>);
	const button = screen.getByText("button");
	expect(button).toHaveClass("custom-classname");
});

test("click on button calls callback", () => {
	const cb = jest.fn();
	render(<Button onClick={cb}>button</Button>);
	const button = screen.getByText("button");
	fireEvent.click(button);
	expect(cb).toBeCalled();
});
