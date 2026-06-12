export interface Links {
  [key: string]: Link;
}

export interface Link {
  deprecation: string;
  href: string;
  hreflang: string;
  name: string;
  profile: string;
  templated: string;
  title: string;
  type: string;
}
