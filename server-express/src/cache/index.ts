import NodeCache from "node-cache";
import { accounts } from "../mock";

export enum CacheKey {
  Account = "account",
}

export const cache = new NodeCache();

cache.set(CacheKey.Account, accounts);

export const setCacheValue = (key: string, value: any, ttl: number | string) => {
  return cache.set(key, value, ttl);
}

export const getCacheValueByKey = (key: string | typeof CacheKey) => {
  return cache.get(key as string);
}