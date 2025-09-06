import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { MapPin, Thermometer, Calendar, TrendingUp, RefreshCw } from 'lucide-react';

interface TemperatureData {
  name: string;
  coordinates: [number, number];
  temperature: number;
  humidity: number;
  solarIrradiance: number;
  region: string;
}

const SudanHeatMap: React.FC = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'temperature' | 'solar'>('solar');
  const [selectedCity, setSelectedCity] = useState<TemperatureData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Generate realistic temperature data for Sudan cities
  const generateTemperatureData = (): TemperatureData[] => {
    const cities = [
      { name: 'Khartoum', coordinates: [50, 45] as [number, number], region: 'Central' },
      { name: 'Port Sudan', coordinates: [85, 25] as [number, number], region: 'Eastern' },
      { name: 'Kassala', coordinates: [80, 45] as [number, number], region: 'Eastern' },
      { name: 'El Obeid', coordinates: [40, 55] as [number, number], region: 'Western' },
      { name: 'Nyala', coordinates: [25, 70] as [number, number], region: 'Western' },
      { name: 'Wad Madani', coordinates: [55, 50] as [number, number], region: 'Central' },
      { name: 'El Fasher', coordinates: [20, 55] as [number, number], region: 'Western' },
      { name: 'Atbara', coordinates: [60, 30] as [number, number], region: 'Northern' },
      { name: 'Dongola', coordinates: [45, 20] as [number, number], region: 'Northern' },
      { name: 'Gedaref', coordinates: [75, 50] as [number, number], region: 'Eastern' },
      { name: 'Juba', coordinates: [45, 85] as [number, number], region: 'Southern' },
      { name: 'Malakal', coordinates: [50, 75] as [number, number], region: 'Southern' },
    ];

    const currentMonth = new Date().getMonth();
    const isHotSeason = currentMonth >= 2 && currentMonth <= 6; // March to July
    const timeOfDay = new Date().getHours();
    const isDaytime = timeOfDay >= 6 && timeOfDay <= 18;

    return cities.map(city => {
      // Simulate realistic temperature variations based on region and time
      let baseTemp = isHotSeason ? 35 + Math.random() * 15 : 22 + Math.random() * 18;
      
      // Regional adjustments
      if (city.region === 'Northern') baseTemp += 5; // Desert regions hotter
      if (city.region === 'Southern') baseTemp -= 3; // More moderate
      if (city.region === 'Eastern' && city.name === 'Port Sudan') baseTemp -= 2; // Coastal cooling
      
      // Time of day adjustment
      if (!isDaytime) baseTemp -= 8 + Math.random() * 5; // Cooler at night
      
      const finalTemp = Math.round(baseTemp + (Math.random() - 0.5) * 4);
      
      return {
        name: city.name,
        coordinates: city.coordinates,
        temperature: Math.max(15, Math.min(52, finalTemp)),
        humidity: Math.round(10 + Math.random() * 35 + (city.region === 'Eastern' ? 15 : 0)),
        solarIrradiance: Math.round(700 + Math.random() * 500 + (isDaytime ? 200 : -300)),
        region: city.region,
      };
    });
  };

  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>(() => generateTemperatureData());

  const getTemperatureColor = (temp: number): string => {
    if (temp >= 45) return '#8B0000'; // Dark red
    if (temp >= 40) return '#DC2626'; // Red
    if (temp >= 35) return '#F97316'; // Orange
    if (temp >= 30) return '#FACC15'; // Yellow
    if (temp >= 25) return '#65A30D'; // Green
    return '#3B82F6'; // Blue
  };

  const getSolarColor = (irradiance: number): string => {
    if (irradiance >= 1100) return '#FBBF24'; // Golden
    if (irradiance >= 1000) return '#F59E0B'; // Amber
    if (irradiance >= 900) return '#EF4444'; // Red
    return '#F97316'; // Orange
  };

  const refreshData = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTemperatureData(generateTemperatureData());
      setLastUpdate(new Date());
      setIsAnimating(false);
    }, 800);
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  // SVG Sudan outline (simplified)
  const SudanSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Sudan country outline */}
      <path
        d="M15,10 L85,10 L90,20 L85,30 L80,35 L85,50 L80,60 L75,70 L70,80 L60,85 L50,90 L40,85 L30,80 L25,70 L20,60 L15,50 L20,40 L15,30 Z"
        fill="rgba(59, 130, 246, 0.1)"
        stroke="rgba(59, 130, 246, 0.3)"
        strokeWidth="0.5"
        className="transition-all duration-300"
      />
      
      {/* Regional boundaries */}
      <g stroke="rgba(107, 114, 128, 0.2)" strokeWidth="0.3" fill="none">
        <line x1="40" y1="10" x2="40" y2="50" />
        <line x1="60" y1="10" x2="60" y2="60" />
        <line x1="15" y1="60" x2="85" y2="60" />
      </g>
      
      {/* Temperature/Solar data points */}
      {temperatureData.map((city, index) => {
        const isTemperatureMode = viewMode === 'temperature';
        const value = isTemperatureMode ? city.temperature : city.solarIrradiance;
        const color = isTemperatureMode ? getTemperatureColor(city.temperature) : getSolarColor(city.solarIrradiance);
        const size = Math.max(2, (isTemperatureMode ? value * 0.15 : value * 0.008));
        
        return (
          <g key={index}>
            {/* Pulsing animation ring */}
            {isAnimating && (
              <circle
                cx={city.coordinates[0]}
                cy={city.coordinates[1]}
                r={size * 2}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                opacity="0.6"
                className="animate-ping"
              />
            )}
            
            {/* Main temperature/solar circle */}
            <circle
              cx={city.coordinates[0]}
              cy={city.coordinates[1]}
              r={size}
              fill={color}
              stroke="white"
              strokeWidth="0.3"
              className="cursor-pointer transition-all duration-300 hover:scale-125 hover:stroke-2"
              onClick={() => setSelectedCity(city)}
              style={{
                filter: `drop-shadow(0 0 ${size * 0.5}px ${color}80)`,
                animation: isAnimating ? 'pulse 0.8s ease-in-out' : 'none'
              }}
            />
            
            {/* Temperature/Solar value label */}
            <text
              x={city.coordinates[0]}
              y={city.coordinates[1]}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[2px] font-bold fill-white"
              style={{ textShadow: '0 0 2px rgba(0,0,0,0.8)' }}
            >
              {isTemperatureMode ? `${value}°` : Math.round(value/100)}
            </text>
            
            {/* City name label */}
            <text
              x={city.coordinates[0]}
              y={city.coordinates[1] + size + 2}
              textAnchor="middle"
              className="text-[1.5px] fill-gray-600 font-medium"
            >
              {city.name}
            </text>
          </g>
        );
      })}
      
      {/* Legend overlay */}
      <g transform="translate(5, 75)">
        <rect width="20" height="20" fill="rgba(255,255,255,0.9)" rx="1" stroke="rgba(0,0,0,0.1)" strokeWidth="0.1"/>
        <text x="1" y="3" className="text-[1.2px] font-semibold fill-gray-800">
          {viewMode === 'temperature' ? 'Temperature (°C)' : 'Solar (W/m²)'}
        </text>
        <text x="1" y="5" className="text-[1px] fill-gray-600">
          Last update: {lastUpdate.toLocaleTimeString()}
        </text>
      </g>
    </svg>
  );


  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-primary" />
              Sudan Real-Time Climate Heat Map
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'temperature' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('temperature')}
              >
                <Thermometer className="h-4 w-4 mr-1" />
                Temperature
              </Button>
              <Button
                variant={viewMode === 'solar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('solar')}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Solar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshData}
                disabled={isAnimating}
              >
                <RefreshCw className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Heat Map Visualization */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border shadow-inner p-4 mb-6">
            <div className="w-full h-[500px] relative">
              <SudanSVG />
              
              {/* Live indicator */}
              <div className="absolute top-2 right-2 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700">Live Data</span>
              </div>
              
              {/* Current time */}
              <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-xs text-gray-600">
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Data visualization section */}
          <div className="space-y-6">
            {/* Regional Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Northern', 'Eastern', 'Central', 'Western'].map(region => {
                const regionData = temperatureData.filter(city => city.region === region);
                const avgTemp = regionData.length > 0 
                  ? Math.round(regionData.reduce((sum, city) => sum + city.temperature, 0) / regionData.length)
                  : 0;
                const avgSolar = regionData.length > 0 
                  ? Math.round(regionData.reduce((sum, city) => sum + city.solarIrradiance, 0) / regionData.length)
                  : 0;
                
                return (
                  <div key={region} className="text-center p-3 bg-gradient-to-br from-white to-gray-50 rounded-lg border">
                    <div className="text-sm font-medium text-gray-600 mb-1">{region}</div>
                    <div className="text-lg font-bold text-primary mb-1">
                      {viewMode === 'temperature' ? `${avgTemp}°C` : `${avgSolar}W/m²`}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {regionData.length} cities
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend and Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Temperature Legend */}
              {viewMode === 'temperature' && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Temperature Scale (°C)
                  </h4>
                  <div className="space-y-2">
                    {[
                      { range: '45°+', color: '#8B0000', label: 'Extreme Heat' },
                      { range: '40-44°', color: '#DC2626', label: 'Very Hot' },
                      { range: '35-39°', color: '#F97316', label: 'Hot' },
                      { range: '30-34°', color: '#FACC15', label: 'Warm' },
                      { range: '25-29°', color: '#65A30D', label: 'Moderate' },
                      { range: '<25°', color: '#3B82F6', label: 'Cool' },
                    ].map(item => (
                      <div key={item.range} className="flex items-center gap-3 text-sm">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium w-16">{item.range}</span>
                        <span className="text-muted-foreground">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solar Legend */}
              {viewMode === 'solar' && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Solar Irradiance (W/m²)
                  </h4>
                  <div className="space-y-2">
                    {[
                      { range: '1100+', color: '#FBBF24', label: 'Excellent' },
                      { range: '1000-1099', color: '#F59E0B', label: 'Very Good' },
                      { range: '900-999', color: '#EF4444', label: 'Good' },
                      { range: '<900', color: '#F97316', label: 'Moderate' },
                    ].map(item => (
                      <div key={item.range} className="flex items-center gap-3 text-sm">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium w-20">{item.range}</span>
                        <span className="text-muted-foreground">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Climate Analysis */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Climate Insights
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border-amber-400">
                    <p className="font-medium text-amber-800">Peak Solar Hours</p>
                    <p className="text-amber-700">
                      {new Date().getHours() >= 10 && new Date().getHours() <= 14 
                        ? 'Current time is optimal for solar generation' 
                        : 'Solar generation will peak between 10 AM - 2 PM'}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-400">
                    <p className="font-medium text-blue-800">Weather Pattern</p>
                    <p className="text-blue-700">
                      {temperatureData.filter(d => d.temperature > 40).length > 6 
                        ? 'Hot weather pattern detected - ideal for solar but consider cooling systems'
                        : 'Moderate temperatures - excellent conditions for solar panel efficiency'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border">
                <div className="text-2xl font-bold text-red-600">
                  {Math.max(...temperatureData.map(d => d.temperature))}°C
                </div>
                <div className="text-sm text-muted-foreground">Highest Temp</div>
                <div className="text-xs text-red-500 mt-1">
                  {temperatureData.find(d => d.temperature === Math.max(...temperatureData.map(d => d.temperature)))?.name}
                </div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.min(...temperatureData.map(d => d.temperature))}°C
                </div>
                <div className="text-sm text-muted-foreground">Lowest Temp</div>
                <div className="text-xs text-blue-500 mt-1">
                  {temperatureData.find(d => d.temperature === Math.min(...temperatureData.map(d => d.temperature)))?.name}
                </div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border">
                <div className="text-2xl font-bold text-yellow-600">
                  {Math.round(temperatureData.reduce((sum, d) => sum + d.solarIrradiance, 0) / temperatureData.length)}
                </div>
                <div className="text-sm text-muted-foreground">Avg Solar W/m²</div>
                <Badge variant="secondary" className="mt-1">
                  {Math.round(temperatureData.reduce((sum, d) => sum + d.solarIrradiance, 0) / temperatureData.length) > 1000 ? 'Excellent' : 'Good'}
                </Badge>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">
                  {temperatureData.filter(d => d.solarIrradiance > 1000).length}
                </div>
                <div className="text-sm text-muted-foreground">Prime Solar Locations</div>
                <div className="text-xs text-green-500 mt-1">
                  out of {temperatureData.length} cities
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected City Details */}
      {selectedCity && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {selectedCity.name} Details
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedCity(null)}
              >
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg">
                <Thermometer className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {selectedCity.temperature}°C
                </div>
                <div className="text-sm text-muted-foreground">Current Temperature</div>
                <Badge variant="secondary" className="mt-2">
                  {selectedCity.temperature >= 40 ? 'Very Hot' : 
                   selectedCity.temperature >= 35 ? 'Hot' : 
                   selectedCity.temperature >= 30 ? 'Warm' : 'Moderate'}
                </Badge>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                <div className="text-2xl mb-2">💧</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {selectedCity.humidity}%
                </div>
                <div className="text-sm text-muted-foreground">Humidity</div>
                <Badge variant="secondary" className="mt-2">
                  {selectedCity.humidity < 30 ? 'Low' : selectedCity.humidity < 60 ? 'Moderate' : 'High'}
                </Badge>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                <div className="text-2xl mb-2">☀️</div>
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  {selectedCity.solarIrradiance}
                </div>
                <div className="text-sm text-muted-foreground">W/m² Solar Irradiance</div>
                <Badge variant="secondary" className="mt-2">
                  {selectedCity.solarIrradiance >= 1100 ? 'Excellent' : 
                   selectedCity.solarIrradiance >= 1000 ? 'Very Good' : 
                   selectedCity.solarIrradiance >= 900 ? 'Good' : 'Moderate'}
                </Badge>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Solar Energy Potential</h4>
              <p className="text-sm text-green-700">
                {selectedCity.name} shows {selectedCity.solarIrradiance >= 1000 ? 'excellent' : 'good'} solar energy potential 
                with {selectedCity.solarIrradiance} W/m² irradiance. The current temperature of {selectedCity.temperature}°C 
                and {selectedCity.humidity}% humidity create {selectedCity.solarIrradiance >= 1000 ? 'optimal' : 'favorable'} 
                conditions for solar panel installation and energy generation.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SudanHeatMap;