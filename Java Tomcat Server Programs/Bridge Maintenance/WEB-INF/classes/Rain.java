import java.io.*;
import java.net.*;

public class Rain {

    private static final String API_KEY = "9a908774ef7e030eebf1742043ef2963";  // Replace with your OpenWeather API key
    private static final String API_URL = "http://api.openweathermap.org/data/2.5/weather";

    // Method to get the total rain from the OpenWeather API
    public static float getTotalRain(float latitude, float longitude) {
        try {
            // Construct the URL for the OpenWeather API request
            String urlString = API_URL + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY + "&units=metric";

            // Create a URL object
            URL url = new URL(urlString);

            // Open a connection
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);  // Set timeout for connection
            connection.setReadTimeout(5000);     // Set timeout for reading response

            // Get the response code
            int responseCode = connection.getResponseCode();

            // If the response code is 200 (HTTP_OK), proceed to read the response
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Read the input stream (response from the server)
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                // Read each line of the response
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }

                // Close the reader
                in.close();

                // Parse the response manually (extract rain and pH values)
                String responseString = response.toString();

                // Extract the rain value
                int rainIndex = responseString.indexOf("\"rain\":");
                float rain = 0; // Default rain value
                if (rainIndex != -1) {
                    int rainVolumeIndex = responseString.indexOf("3h", rainIndex);
                    if (rainVolumeIndex != -1) {
                        int startIndex = responseString.indexOf(":", rainVolumeIndex) + 1;
                        int endIndex = responseString.indexOf(",", startIndex);
                        if (endIndex == -1) {
                            endIndex = responseString.indexOf("}", startIndex); // In case it's the last value in the JSON
                        }
                        String rainStr = responseString.substring(startIndex, endIndex).trim();
                        rain = Float.parseFloat(rainStr);
                    }
                }

                // Return the total rain value (in mm) and a dummy pH value
                float rainPH = 7.0f; // Placeholder value for pH (since pH isn't provided by the OpenWeather API)

                return rain;
            } else {
                // If response code is not 200, throw an exception
                throw new Exception("Failed to get weather data. HTTP code: " + responseCode);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return -1;  // Return -1 if there's an error
        }
    }

    // Method to get the rain pH (dummy function as OpenWeather API doesn't provide pH data)
    public static float getRainPH(float latitude, float longitude) {
        // For the sake of this example, we assume a neutral pH of 7.0
        return 7.0f; // Placeholder value for pH
    }

    // Main method for testing
    public static void main(String[] args) {
        float latitude = 37.7749f;  // Example: San Francisco Latitude
        float longitude = -122.4194f;  // Example: San Francisco Longitude

        // Get the total rain
        float rain = getTotalRain(latitude, longitude);

        // Get the rain pH (dummy value)
        float rainPH = getRainPH(latitude, longitude);

        if (rain != -1) {
            System.out.println("Total Rain: " + rain + " mm");
            System.out.println("Rain pH: " + rainPH);
        } else {
            System.out.println("Error retrieving rain data.");
        }
    }
}
