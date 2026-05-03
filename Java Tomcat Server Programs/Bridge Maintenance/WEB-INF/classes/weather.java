import java.io.*;
import java.net.*;
import java.util.*;

public class weather {

    private static final String API_KEY = "9a908774ef7e030eebf1742043ef2963";
    private static final String API_URL = "http://api.openweathermap.org/data/2.5/weather";

    public static float getWindSpeed(float latitude, float longitude) {
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

                // Parse the response manually (extract wind speed)
                String responseString = response.toString();

                // Find the index of the "wind" and "speed" in the response string
                int windIndex = responseString.indexOf("\"wind\":");
                if (windIndex == -1) {
                    throw new Exception("Wind data not found in the response.");
                }

                int speedIndex = responseString.indexOf("\"speed\":", windIndex);
                if (speedIndex == -1) {
                    throw new Exception("Wind speed not found in the response.");
                }

                // Extract the wind speed value from the string
                int startIndex = responseString.indexOf(":", speedIndex) + 1;
                int endIndex = responseString.indexOf(",", startIndex);
                if (endIndex == -1) {
                    endIndex = responseString.indexOf("}", startIndex); // In case it's the last value in the JSON
                }

                String windSpeedStr = responseString.substring(startIndex, endIndex).trim();
                return Float.parseFloat(windSpeedStr);
            } else {
                // If response code is not 200, throw an exception
                throw new Exception("Failed to get weather data. HTTP code: " + responseCode);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return -1;  // Return -1 if there's an error
        }
    }

    public static void main(String ar[]){
        System.out.println(getWindSpeed(19.9975f,73.7898f) );
    }
}
