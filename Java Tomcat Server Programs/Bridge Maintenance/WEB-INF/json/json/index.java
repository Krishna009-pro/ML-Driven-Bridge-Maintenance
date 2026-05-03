import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

public class RainfallFetcher {



    

    public static void main(String[] args) {
        double latitude = 40.7128; // Example: New York City
        double longitude = -74.0060;

        double rainfall = getRainfall(latitude, longitude);
        System.out.println("Rainfall at (" + latitude + ", " + longitude + "): " + rainfall + " mm");
    }
}
