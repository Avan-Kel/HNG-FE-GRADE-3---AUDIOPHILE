// convex/todos.ts
import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

// Add a todo
export const add = internalMutation({
  args: {
    text: v.string(),
  },
  handler: async ({ db }, { text }) => {
    await db.insert("todos", {
      text,
      completed: false,
      createdAt: Date.now(),
    });
  },
});

// List all todos
export const list = internalQuery(async ({ db }) => {
  return await db.query("todos").collect();
});
