import { curry, map, compose } from "ramda";

export const composeEach = curry((fs, g) =>
  map(f => compose(g, f), fs));
