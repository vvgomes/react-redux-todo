import { curry, map, compose } from "ramda";

export const composeAll = curry((fs, g) =>
  map(f => compose(g, f), fs));
