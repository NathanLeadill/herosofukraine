type ReportType = {
  id: number;
  title: string;
  description: string;
  images?: Image[];
  location: [number, number];
  date: string;
  status: 'active' | 'archived';
  type: 'main' | 'secondary';
};

type Image = {
  id: number;
  url: string;
  caption?: string;
}

export type { ReportType };