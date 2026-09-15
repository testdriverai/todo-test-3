import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

const APP_URL = "https://javascriptbear.github.io/todo_react_app/";

describe("Todo React App", () => {
  it("should create a new task and display it in the list", async (context) => {
    const testdriver = TestDriver(context);

    // Launch Chrome browser navigating to the production Todo app
    await testdriver.provision.chrome({ url: APP_URL });

    // Verify application header loaded
    const appHeader = await testdriver.find("My Tasks");
    expect(appHeader).toBeTruthy();

    // Click "New Task" button to open the modal
    const newTaskBtn = await testdriver.find("New Task");
    await newTaskBtn.click();

    // Fill in Title
    const titleInput = await testdriver.find("Title");
    await titleInput.click();
    await testdriver.type("Buy Groceries");

    // Fill in Summary
    const summaryInput = await testdriver.find("Summary");
    await summaryInput.click();
    await testdriver.type("Milk, eggs, bread, and coffee");

    // Click "Create Task" button
    const createTaskBtn = await testdriver.find("Create Task");
    await createTaskBtn.click();

    // Assert the task was created and is visible in the list
    const createdTask = await testdriver.assert("Buy Groceries task is visible in the task list");
    expect(createdTask).toBeTruthy();
  });

  it("should toggle dark and light theme", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: APP_URL });

    // Click the theme toggle icon next to My Tasks
    const themeToggle = await testdriver.find("theme toggle button near My Tasks");
    await themeToggle.click();

    // Verify background/theme change
    const themeAssert = await testdriver.assert("the app theme toggled color mode");
    expect(themeAssert).toBeTruthy();
  });
});
