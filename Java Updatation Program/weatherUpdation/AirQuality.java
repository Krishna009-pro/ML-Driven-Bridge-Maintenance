package weatherUpdation;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class AirQuality {

    // Fetch OpenWeather API key from environment variables
    private static final String API_KEY = System.getenv("OPENWEATHER_API_KEY");
    
    // OpenWeather API endpoint for air pollution
    private static final String API_URL = "http://api.openweathermap.org/data/2.5/air_pollution?lat=%f&lon=%f&appid=" + API_KEY;

    // Function to get NO2
    public static double getNO2(double latitude, double longitude) {
        String response = getAirQualityData(latitude, longitude);
        return parsePollutantValue(response, "no2");
    }

    // Function to get SO2
    public static double getSO2(double latitude, double longitude) {
        String response = getAirQualityData(latitude, longitude);
        return parsePollutantValue(response, "so2");
    }

    // Function to get CO
    public static double getCO(double latitude, double longitude) {
        String response = getAirQualityData(latitude, longitude);
        return parsePollutantValue(response, "co");
    }

    // Function to get CO2 (Assuming OpenWeather does not provide CO2, we can try using CO or request for a custom API)
    public static double getCO2(double latitude, double longitude) {
        String response = getAirQualityData(latitude, longitude);
        return parsePollutantValue(response, "co");  // Using CO as CO2 is not provided directly
    }

    // Helper function to make API request and fetch air quality data as String
    private static String getAirQualityData(double latitude, double longitude) {
        try {
            // Construct URL to make API request
            URL url = new URL(String.format(API_URL, latitude, longitude));
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            
            // Read the response
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            
            // Return response as plain String
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Helper function to parse pollutant value from the response
    private static double parsePollutantValue(String response, String pollutant) {
        if (response == null || response.isEmpty()) {
            return -1;  // Return -1 if there's no response
        }

        // Find the start of the required pollutant key (e.g., "no2":)
        String key = "\"" + pollutant + "\":";
        int startIndex = response.indexOf(key);
        
        if (startIndex == -1) {
            return -1;  // Return -1 if pollutant is not found in the response
        }

        // Find the value associated with the pollutant (after the ":")
        int valueStartIndex = startIndex + key.length();
        int valueEndIndex = response.indexOf(",", valueStartIndex);
        if (valueEndIndex == -1) {
            valueEndIndex = response.indexOf("}", valueStartIndex); // In case it's the last value
        }

        // Extract the value as a substring and convert it to double
        String valueString = response.substring(valueStartIndex, valueEndIndex).trim();
        try {
            return Double.parseDouble(valueString);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return -1;
        }
    }


}
