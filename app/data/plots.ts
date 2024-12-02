export interface Plot {
  id: string;
  title: string;
  size: number; // in square meters
  price: number;
  location: string;
  description: string;
}

export const plots: Plot[] = [
  {
    id: "1",
    title: "Scenic Mountain View Plot",
    size: 1200,
    price: 150000,
    location: "Mountain Valley, CO",
    description: "Beautiful plot with panoramic mountain views",
  },
  {
    id: "2",
    title: "Lakefront Property",
    size: 800,
    price: 200000,
    location: "Lake District, MN",
    description: "Direct lake access with private beach",
  },
  {
    id: "3",
    title: "Urban Development Land",
    size: 500,
    price: 300000,
    location: "Downtown Metro, NY",
    description: "Prime location for commercial development",
  },
]; 