
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { plots, type Plot } from "~/data/plots";
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: "Land Plots Listing" },
    { name: "description", content: "Browse available plots of land" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");
  let filteredPlots = [...plots];
  const location = url.searchParams.get("location");

  if (minPrice) {
    filteredPlots = filteredPlots.filter(
      (plot) => plot.price >= parseInt(minPrice)
    );
  }

  if (maxPrice) {
    filteredPlots = filteredPlots.filter(
      (plot) => plot.price <= parseInt(maxPrice)
    );
  }

  if (location) {
    filteredPlots = filteredPlots.filter(
      (plot) => plot.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  return json({ plots: filteredPlots });
};

export default function Index() {
  const { plots } = useLoaderData<{ plots: Plot[]}>();
  const [searchParams, setSearchParams] = useSearchParams();

  // variables for holding the range state and location state
  const [minPriceState, setMinPrice] = useState(0);
  const [maxPriceState, setMaxPrice] = useState(200000); // or use priciestPlotPrice?
  const [locationState, setLocation] = useState('');

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMaxPrice(value)
  };

  // update URL params based on user input
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Plots</h1>
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          {/* Location Filter */}
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filter results</h2>
          <div className="mb-6">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={locationState}
              onChange={(e) => {
                setLocation(e.target.value); // Update location state
                handleFilterChange(e); // Update URL params
              }}
              placeholder="Enter a location"
            />
          </div>

        {/* Price Range Slider */}
        <div className="flex gap-4"> {/* Flex parent container*/}
        <div className="flex-1"> {/* Share the space equally */}
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
            Min Price ($)
          </label>
          <input
            type="range"
            id="minPrice"
            name="minPrice"
            min="0"
            max={maxPriceState} // max should be dynamic or highest price?
            step="5000" 
            value={searchParams.get("minPrice") || 0}
            onChange={(e) => {
              handleFilterChange(e); // Update URL params
              handleMinPriceChange(e); // Update min price state
            }}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>${minPriceState.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex-1"> {/* Share the space equally */}
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
            Max Price ($)
          </label>
          <input
            type="range"
            id="maxPrice"
            name="maxPrice"
            min={minPriceState} // min should be dynamic or lowest price?
            max={200000} // Or use highest price
            step="5000"
            value={searchParams.get("maxPrice") || 200000}
            onChange={(e) => {
              handleFilterChange(e); // Update URL params
              handleMaxPriceChange(e); // Update max price state
            }}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>${maxPriceState.toLocaleString()}</span>
          </div>
        </div>
      </div>
      </div>
        
        {/* Price Filter Section */}
        {/* <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Individual price filtering
          </h2>
          <div className="flex gap-4">
          
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                Min Price ($)
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchParams.get("minPrice") || ""}
                onChange={handleFilterChange}
                placeholder="Set value"
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                Max Price ($)
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchParams.get("maxPrice") || ""}
                onChange={handleFilterChange}
                placeholder="Set value"
              />
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plots.length > 0 ? ( 
            plots.map((plot) => (
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
          ))) : (
            <p className="text-gray-700">
              <span className="font-medium">No results, sorry! Try altering the minimum and maximum values</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

