import { Map } from "ol";

export function getMap(): Map {
  return (window as any).map;
}
