import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("tutorials", "routes/tutorials.tsx"),
  route("tutorials/quick-start", "routes/tutorials.quick-start.tsx"),
  route("tutorials/noass", "routes/tutorials.noass.tsx"),
  route("tutorials/cot", "routes/tutorials.cot.tsx"),
] satisfies RouteConfig;
