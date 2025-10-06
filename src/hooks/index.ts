/** @format */

import { useMediaQuery } from "./medias/use-media-query";
import { useApiQueries } from "./queries";

export const hooks = {
  api: useApiQueries,
  ui: {
    mediaQuery: useMediaQuery,
  },
};
