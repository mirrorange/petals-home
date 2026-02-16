import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("tutorials", "routes/tutorials.tsx"),
  route("tutorials/quick-start", "routes/tutorials.quick-start.tsx"),
  route("tutorials/noass", "routes/tutorials.noass.tsx"),
  route("tutorials/cot", "routes/tutorials.cot.tsx"),
  route("tutorials/basic-settings", "routes/tutorials.basic-settings.tsx"),
  route("tutorials/preset-features", "routes/tutorials.preset-features.tsx"),
  route("tutorials/at-freesia", "routes/tutorials.at-freesia.tsx"),
  route("tutorials/memory", "routes/tutorials.memory.tsx"),
  route("tutorials/synopsis", "routes/tutorials.synopsis.tsx"),
  route("tutorials/impersonate", "routes/tutorials.impersonate.tsx"),
] satisfies RouteConfig;
