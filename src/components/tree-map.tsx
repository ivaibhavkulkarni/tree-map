// src/components/tree-map.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from "@react-google-maps/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, MapPin, Info, Calendar, Ruler, AlertTriangle, Droplets, Sun, ThermometerSun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { hyderabadTrees, Tree } from "../data/trees";

export default function TreeMap() {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeInfoWindow, setActiveInfoWindow] = useState<number | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const markerIcon = useMemo(() => {
    if (!isLoaded || !window.google?.maps) {
      return null;
    }
    return {
      url: "/tree-marker.png",
      scaledSize: new window.google.maps.Size(45, 45),
      anchor: new window.google.maps.Point(15, 45),
    };
  }, [isLoaded]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTreeClick = (tree: Tree) => {
    setSelectedTree(tree);
    setActiveInfoWindow(tree.id);
    if (map) {
      map.panTo({ lat: tree.location.lat, lng: tree.location.lng });
      map.setZoom(16);
    }
    if (isMobile) {
      setTimeout(() => {
        document.getElementById("tree-details")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Good":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "Fair":
        return "bg-amber-500 hover:bg-amber-600";
      case "Poor":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-slate-500 hover:bg-slate-600";
    }
  };

  const getHealthProgress = (health: string) => {
    switch (health) {
      case "Good":
        return 90;
      case "Fair":
        return 60;
      case "Poor":
        return 30;
      default:
        return 50;
    }
  };

  // Map center
  const center = useMemo(() => ({ lat: 17.385, lng: 78.4867 }), []); // Hyderabad coordinates

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[80vh]">
      {/* Map Section */}
      <div className="md:col-span-2 h-[50vh] md:h-full rounded-xl overflow-hidden border border-green-200 shadow-inner">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={center}
            zoom={13}
            onLoad={(mapInstance) => setMap(mapInstance)}
            options={{
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
          >
            {hyderabadTrees.map((tree: Tree) => (
              <MarkerF
                key={tree.id}
                position={{ lat: tree.location.lat, lng: tree.location.lng }}
                icon={markerIcon || undefined}
                onClick={() => handleTreeClick(tree)}
              >
                {activeInfoWindow === tree.id && (
                  <InfoWindowF
                    position={{ lat: tree.location.lat, lng: tree.location.lng }}
                    onCloseClick={() => setActiveInfoWindow(null)}
                  >
                    <div className="text-center p-1">
                      <div className="font-bold text-green-800">{tree.species}</div>
                      <p className="text-xs text-slate-600">{tree.location.area}</p>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-xs text-green-700"
                        onClick={() => handleTreeClick(tree)}
                      >
                        View Details
                      </Button>
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            ))}
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Loading map...</p>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div id="tree-details" className="h-full overflow-y-auto">
        {selectedTree ? (
          <Card className="border-green-200 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{selectedTree.species}</h3>
                <Badge className={`${getHealthColor(selectedTree.health)} text-white`}>{selectedTree.health}</Badge>
              </div>
              <p className="italic text-green-100 text-sm">{selectedTree.scientificName}</p>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-green-50">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="p-4 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Tree Health</p>
                    <Progress value={getHealthProgress(selectedTree.health)} className="h-2 mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium">Age</span>
                    </div>
                    <p className="text-lg font-semibold">{selectedTree.age} years</p>
                  </div>

                  <div className="flex flex-col p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Ruler className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium">Height</span>
                    </div>
                    <p className="text-lg font-semibold">{selectedTree.height}m</p>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">Maintenance History</span>
                  </div>
                  <p className="text-sm text-slate-600">Last maintained: {selectedTree.lastMaintenance}</p>
                </div>
              </TabsContent>

              <TabsContent value="location" className="p-4 space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mt-1">
                    <MapPin className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Address</p>
                    <p className="text-slate-600">{selectedTree.location.address}</p>
                    <p className="text-slate-600 font-medium">{selectedTree.location.area}</p>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">Coordinates</span>
                  </div>
                  <p className="text-sm text-slate-600">Latitude: {selectedTree.location.lat.toFixed(6)}</p>
                  <p className="text-sm text-slate-600">Longitude: {selectedTree.location.lng.toFixed(6)}</p>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Water Filtering</span>
                    </div>
                    <p className="text-sm text-slate-600">Filters approximately 100 gallons of water per year</p>
                  </div>

                  <div className="flex flex-col p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Sun className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Shade</span>
                    </div>
                    <p className="text-sm text-slate-600">Provides {selectedTree.height * 5}m² of shade area</p>
                  </div>

                  <div className="flex flex-col p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <ThermometerSun className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Temperature</span>
                    </div>
                    <p className="text-sm text-slate-600">Reduces local temperature by 2-4°C</p>
                  </div>

                  <div className="flex flex-col p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500"
                      >
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                        <line x1="6" x2="6" y1="1" y2="4" />
                        <line x1="10" x2="10" y1="1" y2="4" />
                        <line x1="14" x2="14" y1="1" y2="4" />
                      </svg>
                      <span className="text-sm font-medium">Oxygen</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Produces oxygen for {Math.round(selectedTree.age * 0.5)} people daily
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="p-4 border-t bg-slate-50">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                >
                  <MapPin className="h-4 w-4 mr-1" /> Directions
                </Button>
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  <AlertTriangle className="h-4 w-4 mr-1" /> Report Issue
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="border-green-200 shadow-md h-full">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Tree Details
              </CardTitle>
              <CardDescription>Select a tree on the map to view its details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                <div className="bg-green-50 p-6 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-300"
                  >
                    <path d="M8 19h8a4 4 0 0 0 3.8-2.8 4 4 0 0 0-1.6-4.5c1-1.1 1-2.7.4-4-.7-1.2-2.2-2-3.6-1.7a3 3 0 0 0-3-3 3 3 0 0 0-3 3c-1.4-.2-2.9.5-3.6 1.7-.7 1.3-.5 2.9.4 4a4 4 0 0 0-1.6 4.5A4 4 0 0 0 8 19Z" />
                    <path d="M12 19v3" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-green-800 mb-2">No Tree Selected</h3>
                <p className="max-w-xs text-slate-500">
                  Click on any tree marker on the map to view detailed information about that tree
                </p>
                <div className="mt-6 flex items-center text-sm text-slate-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>15 trees mapped in Hyderabad</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}