import React from "react";
import { aboutUsInformation } from "@/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold uppercase mb-2">
            Meet The Team
          </p>
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We're passionate about making English learning accessible and
            effective for everyone. Our dedicated team works tirelessly to
            create innovative solutions that empower migrant workers.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutUsInformation.map((person, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-border hover:border-primary/30 h-full relative overflow-hidden"
            >
              <CardHeader className="pb-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-10 translate-x-10 group-hover:bg-primary/20 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4 w-8 h-8 bg-primary/15 rounded-lg rotate-12 group-hover:bg-primary/25 transition-colors duration-300"></div>
                <div className="absolute bottom-8 right-6 w-12 h-12 bg-primary/8 rounded-full group-hover:bg-primary/15 transition-colors duration-300"></div>
                <div className="absolute top-1/2 left-2 w-6 h-6 bg-primary/12 rotate-45 group-hover:bg-primary/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-8 w-10 h-10 bg-primary/10 rounded-lg -rotate-6 group-hover:bg-primary/18 transition-colors duration-300"></div>

                <div className="relative mx-auto mb-6">
                  <div className="w-full aspect-[3/3] rounded-xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300 bg-gradient-to-br from-primary/5 to-primary/10">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {person.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-sm px-4 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                  >
                    {person.role}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Decorative elements */}

      </div>
    </div>
  );
}
