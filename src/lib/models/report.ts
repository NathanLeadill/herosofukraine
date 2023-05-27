type ReportType = {
  id: number;
  title: string;
  date: Date;
  description: string;
  icon: ReportIcon;
  images?: Image[];
  location: [number, number];
  status: 'active' | 'archived';
  type: 'main' | 'secondary';
};

type Image = {
  id: number;
  url: string;
  caption?: string;
}

type ReportIcon = "globe" | "image" | "rose" | "user" | "chevron-up" | "link";

export type { ReportType };