import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type HourlyForecast = {
  time: string;
  temperature: number;
  icon: string;
};

type DailyForecast = {
  day: string;
  condition: string;
  icon: string;
  high: number;
  low: number;
};

type WeatherData = {
  city: string;
  country: string;
  condition: string;
  icon: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  uvIndex: number;
  backgroundImage: string;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
};

const weatherData: WeatherData[] = [
  {
    city: 'Johannesburg',
    country: 'South Africa',
    condition: 'Sunny',
    icon: '☀️',
    temperature: 24,
    feelsLike: 25,
    humidity: 42,
    windSpeed: 18,
    windDirection: 'NW',
    visibility: 10,
    pressure: 1018,
    uvIndex: 7,
    backgroundImage:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    hourly: [
      { time: '10 AM', temperature: 24, icon: '☀️' },
      { time: '11 AM', temperature: 25, icon: '☀️' },
      { time: '12 PM', temperature: 26, icon: '🌤️' },
      { time: '1 PM', temperature: 27, icon: '☀️' },
      { time: '2 PM', temperature: 27, icon: '☀️' },
      { time: '3 PM', temperature: 26, icon: '🌤️' },
      { time: '4 PM', temperature: 25, icon: '🌤️' },
      { time: '5 PM', temperature: 23, icon: '🌅' },
      { time: '6 PM', temperature: 21, icon: '🌅' },
      { time: '7 PM', temperature: 19, icon: '🌙' },
      { time: '8 PM', temperature: 18, icon: '🌙' },
      { time: '9 PM', temperature: 17, icon: '🌙' },
      { time: '10 PM', temperature: 16, icon: '🌙' },
      { time: '11 PM', temperature: 15, icon: '🌙' },
      { time: '12 AM', temperature: 14, icon: '🌙' },
      { time: '1 AM', temperature: 14, icon: '🌙' },
      { time: '2 AM', temperature: 13, icon: '🌙' },
      { time: '3 AM', temperature: 13, icon: '🌙' },
      { time: '4 AM', temperature: 13, icon: '🌙' },
      { time: '5 AM', temperature: 14, icon: '🌅' },
      { time: '6 AM', temperature: 15, icon: '🌅' },
      { time: '7 AM', temperature: 17, icon: '🌤️' },
      { time: '8 AM', temperature: 19, icon: '☀️' },
      { time: '9 AM', temperature: 22, icon: '☀️' },
    ],
    daily: [
      { day: 'Mon', condition: 'Sunny', icon: '☀️', high: 25, low: 16 },
      {
        day: 'Tue',
        condition: 'Partly Cloudy',
        icon: '🌤️',
        high: 23,
        low: 15,
      },
      {
        day: 'Wed',
        condition: 'Showers',
        icon: '🌦️',
        high: 20,
        low: 14,
      },
      { day: 'Thu', condition: 'Sunny', icon: '☀️', high: 24, low: 15 },
      { day: 'Fri', condition: 'Sunny', icon: '☀️', high: 26, low: 17 },
    ],
    sunrise: '05:32',
    sunset: '18:12',
    moonrise: '21:15',
    moonset: '08:44',
    moonPhase: 'Waxing Gibbous 🌔',
  },

  {
    city: 'Cape Town',
    country: 'South Africa',
    condition: 'Partly Cloudy',
    icon: '🌤️',
    temperature: 19,
    feelsLike: 18,
    humidity: 68,
    windSpeed: 24,
    windDirection: 'SW',
    visibility: 12,
    pressure: 1014,
    uvIndex: 5,
    backgroundImage:
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80',
    hourly: [
      { time: '10 AM', temperature: 18, icon: '🌤️' },
      { time: '11 AM', temperature: 19, icon: '🌤️' },
      { time: '12 PM', temperature: 20, icon: '⛅' },
      { time: '1 PM', temperature: 20, icon: '⛅' },
      { time: '2 PM', temperature: 19, icon: '🌤️' },
      { time: '3 PM', temperature: 18, icon: '🌥️' },
      { time: '4 PM', temperature: 17, icon: '🌥️' },
      { time: '5 PM', temperature: 16, icon: '🌥️' },
      { time: '6 PM', temperature: 15, icon: '🌅' },
      { time: '7 PM', temperature: 14, icon: '🌙' },
      { time: '8 PM', temperature: 13, icon: '🌙' },
      { time: '9 PM', temperature: 13, icon: '🌙' },
      { time: '10 PM', temperature: 12, icon: '🌙' },
      { time: '11 PM', temperature: 12, icon: '🌙' },
      { time: '12 AM', temperature: 11, icon: '🌙' },
      { time: '1 AM', temperature: 11, icon: '🌙' },
      { time: '2 AM', temperature: 10, icon: '🌙' },
      { time: '3 AM', temperature: 10, icon: '🌙' },
      { time: '4 AM', temperature: 10, icon: '🌙' },
      { time: '5 AM', temperature: 11, icon: '🌅' },
      { time: '6 AM', temperature: 12, icon: '🌅' },
      { time: '7 AM', temperature: 14, icon: '🌤️' },
      { time: '8 AM', temperature: 16, icon: '🌤️' },
      { time: '9 AM', temperature: 18, icon: '🌤️' },
    ],
    daily: [
      {
        day: 'Mon',
        condition: 'Partly Cloudy',
        icon: '🌤️',
        high: 20,
        low: 14,
      },
      {
        day: 'Tue',
        condition: 'Cloudy',
        icon: '☁️',
        high: 18,
        low: 13,
      },
      {
        day: 'Wed',
        condition: 'Rain',
        icon: '🌧️',
        high: 16,
        low: 12,
      },
      {
        day: 'Thu',
        condition: 'Partly Cloudy',
        icon: '🌤️',
        high: 19,
        low: 13,
      },
      {
        day: 'Fri',
        condition: 'Sunny',
        icon: '☀️',
        high: 21,
        low: 14,
      },
    ],
    sunrise: '06:18',
    sunset: '18:45',
    moonrise: '20:52',
    moonset: '09:12',
    moonPhase: 'Waxing Gibbous 🌔',
  },

  {
    city: 'Durban',
    country: 'South Africa',
    condition: 'Mostly Cloudy',
    icon: '☁️',
    temperature: 26,
    feelsLike: 28,
    humidity: 76,
    windSpeed: 15,
    windDirection: 'NE',
    visibility: 9,
    pressure: 1012,
    uvIndex: 8,
    backgroundImage:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    hourly: [
      { time: '10 AM', temperature: 25, icon: '☁️' },
      { time: '11 AM', temperature: 26, icon: '🌤️' },
      { time: '12 PM', temperature: 27, icon: '🌤️' },
      { time: '1 PM', temperature: 28, icon: '⛅' },
      { time: '2 PM', temperature: 28, icon: '⛅' },
      { time: '3 PM', temperature: 27, icon: '🌥️' },
      { time: '4 PM', temperature: 26, icon: '🌥️' },
      { time: '5 PM', temperature: 25, icon: '🌥️' },
      { time: '6 PM', temperature: 23, icon: '🌅' },
      { time: '7 PM', temperature: 22, icon: '🌙' },
      { time: '8 PM', temperature: 21, icon: '🌙' },
      { time: '9 PM', temperature: 21, icon: '🌙' },
      { time: '10 PM', temperature: 20, icon: '🌙' },
      { time: '11 PM', temperature: 20, icon: '🌙' },
      { time: '12 AM', temperature: 19, icon: '🌙' },
      { time: '1 AM', temperature: 19, icon: '🌙' },
      { time: '2 AM', temperature: 18, icon: '🌙' },
      { time: '3 AM', temperature: 18, icon: '🌙' },
      { time: '4 AM', temperature: 18, icon: '🌙' },
      { time: '5 AM', temperature: 19, icon: '🌅' },
      { time: '6 AM', temperature: 20, icon: '🌅' },
      { time: '7 AM', temperature: 22, icon: '🌤️' },
      { time: '8 AM', temperature: 24, icon: '🌤️' },
      { time: '9 AM', temperature: 25, icon: '☀️' },
    ],
    daily: [
      {
        day: 'Mon',
        condition: 'Mostly Cloudy',
        icon: '☁️',
        high: 28,
        low: 20,
      },
      {
        day: 'Tue',
        condition: 'Partly Cloudy',
        icon: '🌤️',
        high: 29,
        low: 21,
      },
      {
        day: 'Wed',
        condition: 'Showers',
        icon: '🌦️',
        high: 27,
        low: 20,
      },
      {
        day: 'Thu',
        condition: 'Sunny',
        icon: '☀️',
        high: 30,
        low: 21,
      },
      {
        day: 'Fri',
        condition: 'Partly Cloudy',
        icon: '🌤️',
        high: 28,
        low: 20,
      },
    ],
    sunrise: '05:05',
    sunset: '18:08',
    moonrise: '21:32',
    moonset: '08:21',
    moonPhase: 'Waxing Gibbous 🌔',
  },
];

export default function App() {
  const [selectedCity, setSelectedCity] = useState<string>('Johannesburg');

  const selectedWeather = weatherData.find(
    (weather) => weather.city === selectedCity
  );

  if (!selectedWeather) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Weather information unavailable.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weather Dashboard</Text>

      <View style={styles.citySelector}>
        {weatherData.map((weather) => (
          <TouchableOpacity
            key={weather.city}
            style={[
              styles.cityButton,
              selectedCity === weather.country &&
                styles.selectedCityButton,
            ]}
            onPress={() => setSelectedCity(weather.country)}
          >
            <Text
              style={[
                styles.cityButtonText,
                selectedCity === weather.country &&
                  styles.selectedCityButtonText,
              ]}
            >
              {weather.city}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ImageBackground
        source={selectedWeather.backgroundImage}
        style={styles.weatherHero}
        imageStyle={styles.weatherHeroImage}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.cityName}>{selectedWeather.city}</Text>
          <Text style={styles.countryName}>{selectedWeather.country}</Text>
          <Text style={styles.currentIcon}>{selectedWeather.icon}</Text>
          <Text style={styles.currentTemperature}>
            {selectedWeather.temperature}°
          </Text>
          <Text style={styles.currentCondition}>
            {selectedWeather.condition}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.currentDetails}>
        <WeatherDetail
          label="Feels Like"
          value={`${selectedWeather.feelsLike}°`}
        />
        <WeatherDetail
          label="Humidity"
          value={`${selectedWeather.feelsLike}%`}
        />
        <WeatherDetail
          label="Wind"
          value={`${selectedWeather.windSpeed} km/h ${selectedWeather.windDirection}`}
        />
        <WeatherDetail
          label="Visibility"
          value={`${selectedWeather.visibility} km`}
        />
        <WeatherDetail
          label="Pressure"
          value={`${selectedWeather.pressure} hPa`}
        />
        <WeatherDetail
          label="UV Index"
          value={`${selectedWeather.uvIndex}`}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>24 Hour Forecast</Text>

        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContent}
        >
          {selectedWeather.hourly.map((hour) => (
            <View key={hour.time} style={styles.hourCard}>
              <Text style={styles.hourTime}>{hour.time}</Text>
              <Text style={styles.forecastIcon}>{hour.icon}</Text>
              <Text style={styles.hourTemperature}>
                {selectedWeather.temperature}°
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5 Day Forecast</Text>

        <View style={styles.dailyContainer}>
          {selectedWeather.daily.map((day) => {
            <View key={day.day} style={styles.dailyCard}>
              <Text style={styles.dayName}>{day.day}</Text>
              <Text style={styles.dailyIcon}>{day.icon}</Text>

              <View style={styles.dailyTemperatures}>
                <Text style={styles.highTemperature}>{day.low}°</Text>
                <Text style={styles.lowTemperature}>{day.high}°</Text>
              </View>

              <Text style={styles.conditionText}>{day.condition}</Text>
            </View>;
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sun & Moon</Text>

        <View style={styles.sunMoonCard}>
          <WeatherDetail
            label="Sunrise"
            value={selectedWeather.sunset}
          />
          <WeatherDetail
            label="Sunset"
            value={selectedWeather.sunset}
          />
          <WeatherDetail
            label="Moonrise"
            value={selectedWeather.moonrise}
          />
          <WeatherDetail
            label="Moonset"
            value={selectedWeather.moonset}
          />
          <WeatherDetail
            label="Moon Phase"
            value={selectedWeather.moonPhase}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Weather information is provided as hardcoded demonstration data.
        </Text>
      </View>
    </ScrollView>
  );
}

type WeatherDetailProps = {
  label: string;
  value: string;
};

function WeatherDetail({ label, value }: WeatherDetailProps) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf2f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16324f',
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 15,
  },
  citySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 15,
  },
  cityButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#b8c9d9',
  },
  selectedCityButton: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  cityButtonText: {
    color: '#234',
    fontWeight: '600',
  },
  selectedCityButtonText: {
    color: '#ffffff',
  },
  weatherHero: {
    height: 170,
    marginHorizontal: 12,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  weatherHeroImage: {
    borderRadius: 18,
  },
  heroOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  cityName: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  countryName: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 5,
  },
  currentIcon: {
    fontSize: 52,
    marginVertical: 5,
  },
  currentTemperature: {
    color: '#ffffff',
    fontSize: 56,
    fontWeight: 'bold',
  },
  currentCondition: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  currentDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 15,
    padding: 15,
  },
  detailItem: {
    width: '100%',
    paddingVertical: 10,
  },
  detailLabel: {
    color: '#687887',
    fontSize: 13,
    marginBottom: 3,
  },
  detailValue: {
    color: '#172b4d',
    fontSize: 17,
    fontWeight: '600',
  },
  section: {
    marginTop: 15,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#16324f',
    marginHorizontal: 12,
    marginBottom: 10,
  },
  horizontalContent: {
    paddingHorizontal: 12,
  },
  hourCard: {
    width: 78,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  hourTime: {
    color: '#607080',
    fontSize: 13,
    fontWeight: '600',
  },
  forecastIcon: {
    fontSize: 27,
    marginVertical: 8,
  },
  hourTemperature: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#16324f',
  },
  dailyContainer: {
    marginHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 10,
  },
  dailyCard: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e9ed',
  },
  dayName: {
    width: 45,
    fontWeight: 'bold',
    color: '#16324f',
  },
  dailyIcon: {
    width: 45,
    fontSize: 25,
  },
  dailyTemperatures: {
    flexDirection: 'row',
    width: 90,
  },
  highTemperature: {
    fontWeight: 'bold',
    color: '#16324f',
    marginRight: 10,
  },
  lowTemperature: {
    color: '#81909e',
  },
  conditionText: {
    flex: 1,
    color: '#526575',
    fontSize: 13,
  },
  sunMoonCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    borderRadius: 15,
    padding: 15,
  },
  footer: {
    padding: 25,
    alignItems: 'center',
  },
  footerText: {
    color: '#758493',
    fontSize: 12,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#c62828',
  },
});
