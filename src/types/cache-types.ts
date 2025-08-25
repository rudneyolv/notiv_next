/** @format */

export interface NextCacheConfig {
  cache?: "force-cache" | "no-store";
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}
