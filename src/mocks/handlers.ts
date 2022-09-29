import { rest } from "msw";

export const handlers = [
  rest.get("/api", (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ fruit: ["사과", "배"] }))
  ),
  rest.post("/setting", (req, res, ctx) => res(ctx.status(201))),
];
