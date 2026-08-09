export interface Project {
  key: string;
  name: string;
  year: string;
  link: string;
  thumb?: string;
  short_desc?: string;
}

export interface Game extends Project {
  short_desc: string;
}

export interface Website extends Project {}

export type AssetCategory = "game" | "website";
