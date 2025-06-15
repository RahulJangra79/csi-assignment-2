import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./ToDoApp";

test("adds task when input is entered and Enter is pressed", () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText(/Add Task/i);
  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(screen.getByText("Test Task")).toBeInTheDocument();
});

test("marks a task as completed when clicked", () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText(/Add Task/i);
  fireEvent.change(input, { target: { value: "Complete Task" } });
  fireEvent.keyDown(input, { key: "Enter" });

  const taskItem = screen.getByText("Complete Task");
  fireEvent.click(taskItem);
  expect(taskItem).toHaveClass("checked");
});

test("filters only completed tasks", () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText(/add task/i);

  fireEvent.change(input, { target: { value: "Task 1" } });
  fireEvent.keyDown(input, { key: "Enter" });

  fireEvent.change(input, { target: { value: "Task 2" } });
  fireEvent.keyDown(input, { key: "Enter" });

  const task2 = screen.getByText("Task 2");
  fireEvent.click(task2); // mark Task 2 as completed

  const completedFilter = screen.getByText(/completed/i);
  fireEvent.click(completedFilter);

  expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();
});

test("deletes a task", () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText(/add task/i);
  fireEvent.change(input, { target: { value: "Delete Me" } });
  fireEvent.keyDown(input, { key: "Enter" });

  const deleteIcon = screen.getAllByTestId("fa-icon")[1]; // Second icon (trash)
  fireEvent.click(deleteIcon);

  expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
});
