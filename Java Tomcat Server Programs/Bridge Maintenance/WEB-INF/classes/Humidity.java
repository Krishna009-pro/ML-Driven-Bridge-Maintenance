import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Humidity {

    // Fetch weather data from an API as a raw JSON string
    private static String fetchWeatherData(double latitude, double longitude) throws Exception {
        // Replace with your weather API key and endpoint
        String apiKey = "9a908774ef7e030eebf1742043ef2963";
        String apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";

        URL url = new URL(apiUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();

        return response.toString();
    }

    // Extract value from JSON response using simple string manipulation
    private static double extractValue(String jsonResponse, String key) {
        try {
            String keyString = "\"" + key + "\":";
            int startIndex = jsonResponse.indexOf(keyString) + keyString.length();
            int endIndex = jsonResponse.indexOf(",", startIndex);
            if (endIndex == -1) {
                endIndex = jsonResponse.indexOf("}", startIndex);
            }
            return Double.parseDouble(jsonResponse.substring(startIndex, endIndex));
        } catch (Exception e) {
            System.err.println("Error extracting key " + key + ": " + e.getMessage());
            return -1; // Error value
        }
    }

    // Calculate dew point using relative humidity and temperature
    private static double calculateDewPoint(double temperature, double relativeHumidity) {
        double humidityFraction = relativeHumidity / 100.0;
        double alpha = Math.log(humidityFraction) + (17.625 * temperature) / (243.04 + temperature);
        return (243.04 * alpha) / (17.625 - alpha);
    }

    // Calculate absolute humidity
    public static double getAbsoluteHumidity(double latitude, double longitude) {
        try {
            String weatherData = fetchWeatherData(latitude, longitude);

            // Extract temperature and relative humidity
            double temperature = extractValue(weatherData, "temp");
            double relativeHumidity = extractValue(weatherData, "humidity");

            // Calculate dew point
            double dewPoint = calculateDewPoint(temperature, relativeHumidity);

            // Absolute Humidity Formula
            double saturationVaporPressure = 6.112 * Math.exp((17.67 * dewPoint) / (dewPoint + 243.5));
            return (saturationVaporPressure * 2.167 * 100) / (temperature + 273.15);

        } catch (Exception e) {
            System.err.println("Error fetching data: " + e.getMessage());
            return -1; // Error value
        }
    }

    // Calculate relative humidity
    public static double getRelativeHumidity(double latitude, double longitude) {
        try {
            String weatherData = fetchWeatherData(latitude, longitude);

            // Extract relative humidity directly
            return extractValue(weatherData, "humidity");

        } catch (Exception e) {
            System.err.println("Error fetching data: " + e.getMessage());
            return -1; // Error value
        }
    }

    public static void main(String[] args) {
        // Example latitude and longitude (San Francisco)
        double latitude = 19.9975;
        double longitude = 73.7898;

        // Calculate and print absolute humidity
        double absoluteHumidity = getAbsoluteHumidity(latitude, longitude);
        System.out.printf("Absolute Humidity: %.2f g/m³%n", absoluteHumidity);

        // Calculate and print relative humidity
        double relativeHumidity = getRelativeHumidity(latitude, longitude);
        System.out.printf("Relative Humidity: %.2f%%%n", relativeHumidity);
    }
}
