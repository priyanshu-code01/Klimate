import { useParams, useSearchParams } from 'react-router-dom';
import { useForecastQuery, useWeatherQuery } from '../hooks/useWeather';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import LoadingSkeleton from '../components/LoadingSkeleton';
import CurrentWeather from '../components/CurrentWeather';
import HourlyTemperature from '../components/HourlyTemperature';
import WeatherDetails from '../components/WeatherDetails';
import WeatherForecast from '../components/WeatherForecast';
import FavoriteButton from '../components/FavoriteButton';

const CityPage = () => {

  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lon = parseFloat(searchParams.get('lon') || '0');

  let coordinates = { lat, lon }

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    weatherQuery.refetch();
    forecastQuery.refetch();
  };

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch weather data. Please try again.</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data?.sys.country}
          </h1>
        <div className="">
          {/* favorite button */}
          <FavoriteButton data={{...weatherQuery.data, name: params.cityName}} />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          {/* current weather */}
          <CurrentWeather
            data={weatherQuery.data}
          />
          {/* hourly forecast */}
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          <WeatherDetails data={weatherQuery.data} />
          {/* forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}

export default CityPage
