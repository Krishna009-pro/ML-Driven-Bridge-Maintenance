import java.net.http.*;
import java.net.*;
import java.io.IOException;
import java.io.*;


public class WeatherUtils {
    // Replace with your OpenWeatherMap API key
    private static final String API_KEY = "9a908774ef7e030eebf1742043ef2963";
    private static final String BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

    public static float getTemperature(double latitude, double longitude)  {
        String tempString = null;
        try{
            String url = String.format("%s?lat=%.4f&lon=%.4f&units=metric&appid=%s",
                    BASE_URL, latitude, longitude, API_KEY);
    
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();
    
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    
            if (response.statusCode() != 200) {
                throw new IOException("Error: Received HTTP " + response.statusCode());
            }
    
            String responseBody = response.body();
             tempString = extractTemperature(responseBody);
            
            
        }catch(Exception e){
            System.out.println("Exception in WeatherUtils.java : "+e);
        }
        if (tempString != null) {
                return Float.parseFloat(tempString);
            } else {
                throw new IllegalArgumentException("Temperature data not found in the response.");
            }
    }

    private static String extractTemperature(String responseBody) {
        String tempKeyword = "\"temp\":";
        int tempIndex = responseBody.indexOf(tempKeyword);
        
        if (tempIndex != -1) {
            int startIndex = tempIndex + tempKeyword.length();
            int endIndex = responseBody.indexOf(",", startIndex);
            if (endIndex == -1) {
                endIndex = responseBody.indexOf("}", startIndex);
            }
            return responseBody.substring(startIndex, endIndex).trim();
        }
        return null;
    }

    public static Float getHumidity(double latitude, double longitude) {
        try {
            // Construct the API request URL
            String urlString = String.format("%s?lat=%f&lon=%f&appid=%s", BASE_URL, latitude, longitude, API_KEY);

            // Open the connection
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = in.readLine()) != null) {
                response.append(line);
            }
            in.close();

            String responseString = response.toString();
            String searchString = "\"humidity\":";
            int humidityIndex = responseString.indexOf(searchString);
            if (humidityIndex != -1) {
                int startIndex = humidityIndex + searchString.length();
                int endIndex = responseString.indexOf(",", startIndex);
                String humidityValue = responseString.substring(startIndex, endIndex).trim();
                return Float.parseFloat(humidityValue);
            } else {
                System.err.println("Humidity not found in the response.");
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}