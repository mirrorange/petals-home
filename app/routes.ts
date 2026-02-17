import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("tutorials", "routes/tutorials.tsx"),
  route("tutorials/quick-start", "routes/tutorials.quick-start.tsx"),
  route("tutorials/noass", "routes/tutorials.noass.tsx"),
  route("tutorials/reset-preset", "routes/tutorials.reset-preset.tsx"),
  route("tutorials/cot", "routes/tutorials.cot.tsx"),
  route("tutorials/basic-settings", "routes/tutorials.basic-settings.tsx"),
  route("tutorials/preset-features", "routes/tutorials.preset-features.tsx"),
  route("tutorials/at-freesia", "routes/tutorials.at-freesia.tsx"),
  route("tutorials/memory", "routes/tutorials.memory.tsx"),
  route("tutorials/synopsis", "routes/tutorials.synopsis.tsx"),
  route("tutorials/impersonate", "routes/tutorials.impersonate.tsx"),
  route("tutorials/banned-words", "routes/tutorials.banned-words.tsx"),
  route("tutorials/custom-cot", "routes/tutorials.custom-cot.tsx"),
  route("tutorials/custom-style", "routes/tutorials.custom-style.tsx"),
] satisfies RouteConfig;
