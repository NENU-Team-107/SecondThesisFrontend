interface AsideDetail {
  index: string;
  title: string;
  icon: string;
  path: string;
  children?: AsideDetail[];
}

export type { AsideDetail };
