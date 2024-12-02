import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { plots, type Plot } from "~/data/plots";

export const meta: MetaFunction = () => {
  return [
    { title: "Land Plots Listing" },
    { name: "description", content: "Browse available plots of land" },
  ];
};

export const loader: LoaderFunction = async () => {
  // In a real app, this would fetch from a database
  return json({ plots });
};

export default function Index() {
  const { plots } = useLoaderData<{ plots: Plot[] }>();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Plots</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plots.map((plot) => (
            <div
              key={plot.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {plot.title}
                </h2>
                <p className="text-gray-600 mb-4">{plot.description}</p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> {plot.location}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Size:</span> {plot.size} m²
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Price:</span> $
                    {plot.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
