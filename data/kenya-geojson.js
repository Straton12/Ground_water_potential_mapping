// Sample GeoJSON data for Kenya maps
// In production, this would be loaded from separate GeoJSON files or APIs

window.KenyaGeoJSON = {
    // Sample county boundaries (simplified)
    counties: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    name: "Nairobi",
                    water_points: 1850,
                    population: 4500000,
                    groundwater_potential: "moderate"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [-1.4, 36.7], [-1.2, 36.7], [-1.2, 37.0], [-1.4, 37.0], [-1.4, 36.7]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Kiambu",
                    water_points: 1420,
                    population: 3200000,
                    groundwater_potential: "moderate"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [-1.3, 36.5], [-1.0, 36.5], [-1.0, 37.0], [-1.3, 37.0], [-1.3, 36.5]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Marsabit",
                    water_points: 320,
                    population: 450000,
                    groundwater_potential: "very-low"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [2.0, 37.5], [3.5, 37.5], [3.5, 39.0], [2.0, 39.0], [2.0, 37.5]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Turkana",
                    water_points: 280,
                    population: 1600000,
                    groundwater_potential: "low"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [2.5, 34.5], [4.5, 34.5], [4.5, 36.5], [2.5, 36.5], [2.5, 34.5]
                    ]]
                }
            }
        ]
    },
    
    // Sample water points
    waterPoints: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    id: 483213,
                    county: "Siaya",
                    status: "non-functional",
                    technology: null,
                    population_served: 2450
                },
                geometry: {
                    type: "Point",
                    coordinates: [34.7617, -0.1022]
                }
            },
            {
                type: "Feature",
                properties: {
                    id: 522269,
                    county: "Homa Bay",
                    status: "non-functional",
                    technology: null,
                    population_served: 1800
                },
                geometry: {
                    type: "Point",
                    coordinates: [34.4571, -0.5273]
                }
            },
            {
                type: "Feature",
                properties: {
                    id: 533489,
                    county: "Busia",
                    status: "functional",
                    technology: "motorized",
                    population_served: 3200
                },
                geometry: {
                    type: "Point",
                    coordinates: [34.1115, 0.4607]
                }
            }
        ]
    },
    
    // Sample groundwater potential zones
    groundwaterZones: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    zone: "very-low",
                    description: "Crystalline bedrock areas"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [37.0, 3.0], [40.5, 3.0], [40.5, 4.5], [37.0, 4.5], [37.0, 3.0]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    zone: "low",
                    description: "Limited groundwater in fractures"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [36.0, 1.5], [38.5, 1.5], [38.5, 3.5], [36.0, 3.5], [36.0, 1.5]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    zone: "moderate",
                    description: "Fair groundwater for community use"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [34.5, -2.0], [36.5, -2.0], [36.5, 0.0], [34.5, 0.0], [34.5, -2.0]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    zone: "moderately-high",
                    description: "Good groundwater potential"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [34.0, -4.0], [35.5, -4.0], [35.5, -1.5], [34.0, -1.5], [34.0, -4.0]
                    ]]
                }
            }
        ]
    },
    
    // Helper functions
    getCountyByName: function(name) {
        return this.counties.features.find(feature => 
            feature.properties.name.toLowerCase() === name.toLowerCase()
        );
    },
    
    getWaterPointsByCounty: function(countyName) {
        return this.waterPoints.features.filter(feature =>
            feature.properties.county.toLowerCase() === countyName.toLowerCase()
        );
    },
    
    getGroundwaterZoneByType: function(zoneType) {
        return this.groundwaterZones.features.filter(feature =>
            feature.properties.zone === zoneType
        );
    },
    
    // Statistics
    getStatistics: function() {
        const stats = {
            totalWaterPoints: this.waterPoints.features.length,
            functionalPoints: this.waterPoints.features.filter(p => p.properties.status === 'functional').length,
            nonFunctionalPoints: this.waterPoints.features.filter(p => p.properties.status === 'non-functional').length,
            totalPopulationServed: this.waterPoints.features.reduce((sum, p) => sum + (p.properties.population_served || 0), 0),
            countiesCovered: new Set(this.waterPoints.features.map(p => p.properties.county)).size
        };
        
        stats.functionalRate = (stats.functionalPoints / stats.totalWaterPoints * 100).toFixed(1);
        stats.avgPopulationPerPoint = Math.round(stats.totalPopulationServed / stats.totalWaterPoints);
        
        return stats;
    }
};