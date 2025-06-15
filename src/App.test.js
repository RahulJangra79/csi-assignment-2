import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./ToDoApp";

// Helper to add a task quickly
const addTask = (label) => {
  const input = screen.getByPlaceholderText(/add task/i);
  fireEvent.change(input, { target: { value: label } });
  fireEvent.keyDown(input, { key: "Enter" });
};

test("adds task when input is entered and Enter is pressed", () => {
  render(<TodoApp />);
  addTask("Test Task");
  expect(screen.getByText("Test Task")).toBeInTheDocument();
});

test("marks a task as completed when clicked", () => {
  render(<TodoApp />);
  addTask("Complete Task");

  // click the task text
  fireEvent.click(screen.getByText("Complete Task"));

  // check the parent <li>, not the <span>
  const taskLi = screen.getByText("Complete Task").closest("li");
  expect(taskLi).toHaveClass("checked");
});

test("filters only completed tasks", () => {
  render(<TodoApp />);
  addTask("Task 1");
  addTask("Task 2");

  // complete Task 2
  fireEvent.click(screen.getByText("Task 2"));

  // click "Completed" filter
  fireEvent.click(screen.getByText(/completed/i));

  expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();
});

test("deletes a task", () => {
  render(<TodoApp />);
  addTask("Delete Me");

  // works with unique IDs like delete-icon-<id>
const deleteIcon = screen.getAllByTestId("delete-icon")[0];
  fireEvent.click(deleteIcon);

  expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
});
