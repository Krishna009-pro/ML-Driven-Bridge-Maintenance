package weatherUpdation;
import java.sql.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Date;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.io.IOException;

import java.time.format.DateTimeFormatter;
public class UpdateValue{
    public final static int sleepTime = 50000;
    public static void main(String ar[]){
        while(true){
            try{
                doUpdate();
                
            }
            catch(Exception e1){
                e1.printStackTrace();
                try{
                    Thread.sleep(10000);
                }catch(Exception e2){
                    System.out.println(e2);
                }
            }
        }
    }
    static java.sql.Connection con= null;
    public static void doUpdate()throws Exception{
        if (con == null)
         con = Connection.getConnection();

        Statement st = con.createStatement();

        ResultSet r = st.executeQuery("SELECT `ID`, `Name`, `Lattitude`, `Longitude`, `Minimum Temperature`, `Average Temperature`, `Maximum Temperature`, `Minimum Absolute Humidity`, `Average Absolute Humidity`, `Maximum Absolute Humidity`, `Minimum Relative Humidity`, `Average Relative Humidity`, `Maximum Relative Humidity`, `Wind Direction`, `Minimum Wind Speed`, `Average Wind Speed`, `Maximum Wind Speed`, `Minimum NO2`, `Average NO2`, `Maximum NO2`, `Minimum SO2`, `Average SO2`, `Maximum SO2`, `Minimum CO`, `Average CO`, `Maximum CO`, `Minimum CO2`, `Average CO2`, `Maximum CO2`, `Minimum Rain`, `Average Rain`, `Maximum Rain`, `Minimum Rain Water PH`, `Average RainWater PH`, `Maximum RainWater PH`, `Minimum WaterFlow Speed`, `Average WaterFlow Speed`, `Maximum WaterFlow Speed`, `Minimum Water Level`, `Average Water Level`, `Maximum Water Level`, `Minimum Ph of RiverWater`, `Average Ph of RiverWater`, `Maximum Ph of RiverWater`, `Total Floods`, `Flood Intensity`, `Age`, `Concrete Type`, `Design Type`, `Rated_Load_Capacity`, `Expiry_Date`, `Slab Thickness`, `Bear_Surface_Area`, `No_Of_Beams`, `Length`, `Width`, `Height`, `Minimum Traffic Volume`, `Average Traffic Volume`, `Maximum Traffic Volume`, `Minimum Traffic Load`, `Average Traffic Load`, `Maximum Traffic Load`, `Speed Limit`, `No of Maintenance`, `Average Time Gap in Maintenance` , `Construction Date` FROM `bridge`");

        Data d ;

        while (r.next()){
            d = new Data(r.getInt(1),r.getString(2),r.getDouble(3),r.getDouble(4),r.getFloat(5),r.getFloat(6),r.getFloat(7),r.getFloat(8),r.getFloat(9),r.getFloat(10),r.getFloat(11),r.getFloat(12),r.getFloat(13), r.getString(14),r.getFloat(15),r.getFloat(16),r.getFloat(17),r.getFloat(18),r.getFloat(19),r.getFloat(20),r.getFloat(21),r.getFloat(22),r.getFloat(23),r.getFloat(24),r.getFloat(25),r.getFloat(26),r.getFloat(27),r.getFloat(28),r.getFloat(29),r.getFloat(30),r.getFloat(31),r.getFloat(32),r.getFloat(33),r.getFloat(34),r.getFloat(35),r.getFloat(36),r.getFloat(37),r.getFloat(38),r.getFloat(39),r.getFloat(40),r.getFloat(41),r.getFloat(42),r.getFloat(43),r.getFloat(44),r.getInt(45),r.getFloat(46),r.getInt(47),r.getString(48),r.getString(49),r.getFloat(50),r.getInt(51),r.getFloat(52),r.getFloat(53),r.getInt(54),r.getFloat(55),r.getFloat(56),r.getFloat(57),r.getInt(58),r.getInt(59),r.getInt(60),r.getFloat(61),r.getFloat(62),r.getFloat(63),r.getInt(64),r.getInt(65),r.getFloat(66),r.getString(67));

            float currentTemp = WeatherUtils.getTemperature(d.getLat(),d.getLon());


            if(d.getMinTemp()>currentTemp){
                d.setMinTemp(currentTemp);
            }

            if(d.getMaxTemp()<currentTemp){
                d.setMaxTemp(currentTemp);
            } 

            d.setAvgTemp((d.getAvgTemp()+currentTemp)/2);



            float absoluteHumidity =(float) Humidity.getAbsoluteHumidity(d.getLat(), d.getLon());
            float relativeHumidity =(float)Humidity.getRelativeHumidity(d.getLat(), d.getLon());

            if(d.getMinAbsHum() > absoluteHumidity){
                d.setMinAbsHum(absoluteHumidity);
            }

            if(d.getMaxAbsHum()<absoluteHumidity){
                d.setMaxAbsHum(absoluteHumidity);
            }

            d.setAvgAbsHum((d.getAvgAbsHum()+absoluteHumidity)/2);


            if(d.getMinRelHum() >relativeHumidity){
                d.setMinRelHum(relativeHumidity);
            }

            if(d.getMaxRelHum() < relativeHumidity){
                d.setMaxRelHum(relativeHumidity);
            }

            d.setAvgRelHum((d.getAvgRelHum()+relativeHumidity)/2);


            float NO2 = (float)AirQuality.getNO2(d.getLat(),d.getLon());
            float SO2 = (float)AirQuality.getSO2(d.getLat(),d.getLon());
            float CO =(float)AirQuality.getCO(d.getLat(),d.getLon());
            float CO2= (float)AirQuality.getCO2(d.getLat(),d.getLon());


            if(d.getMinNO2()>NO2){
                d.setMinNO2(NO2);
            }

            if(d.getMaxNO2()< NO2){
                d.setMaxNO2(NO2);
            }

            d.setAvgNO2((d.getAvgNO2()+NO2)/2);


            
            if(d.getMinSO2()>SO2){
                d.setMinSO2(SO2);
            }

            if(d.getMaxSO2()< SO2){
                d.setMaxSO2(SO2);
            }

            d.setAvgSO2((d.getAvgSO2()+SO2)/2);


            
            if(d.getMinCO2()>CO2){
                d.setMinCO2(CO2);
            }

            if(d.getMaxCO2()< CO2){
                d.setMaxCO2(CO2);
            }

            d.setAvgCO2((d.getAvgCO2()+CO2)/2);


            
            
            if(d.getMinCO()>CO){
                d.setMinCO(CO);
            }

            if(d.getMaxCO()< CO){
                d.setMaxCO(CO);
            }

            d.setAvgCO((d.getAvgCO()+CO)/2);

            





            System.out.println("Date : "+r.getString(67));

            LocalDate constructionDate = d.getconstructionDate();

            LocalDate currentDate = LocalDate.now();

            // Calculate the difference in months
            long monthsDifference = ChronoUnit.MONTHS.between(
                constructionDate.withDayOfMonth(1),
                currentDate.withDayOfMonth(1)
            );

            d.setAge((int)monthsDifference);






            double crainfall = WeatherUtils.getRainfall(d.getLat(),d.getLon());
            if(crainfall>0.00001){
                if(d.getMinRain()>crainfall){
                    d.setMinRain((float)crainfall);
                }
                if(d.getMaxRain()<crainfall){
                    d.setMaxRain((float)crainfall);
                }

                d.setAvgRain((float)(d.getAvgRain()+crainfall)/2);

            }






























            String sampleString = "";

            PreparedStatement p = con.prepareStatement(sampleString=
    "UPDATE `bridge` SET " +
    "`Minimum Temperature` = ?, " +
    "`Average Temperature` = ?, " +
    "`Maximum Temperature` = ?, " +
    "`Minimum Absolute Humidity` = ?, " +
    "`Average Absolute Humidity` = ?, " +
    "`Maximum Absolute Humidity` = ?, " +
    "`Minimum Relative Humidity` = ?, " +
    "`Average Relative Humidity` = ?, " +
    "`Maximum Relative Humidity` = ?, " +
    "`Minimum Wind Speed` = ?, " +
    "`Average Wind Speed` = ?, " +
    "`Maximum Wind Speed` = ?, " +
    "`Minimum NO2` = ?, " +
    "`Average NO2` = ?, " +
    "`Maximum NO2` = ?, " +
    "`Minimum SO2` = ?, " +
    "`Average SO2` = ?, " +
    "`Maximum SO2` = ?, " +
    "`Minimum CO` = ?, " +
    "`Average CO` = ?, " +
    "`Maximum CO` = ?, " +
    "`Minimum CO2` = ?, " +
    "`Average CO2` = ?, " +
    "`Maximum CO2` = ?, " +
    "`Minimum Rain` = ?, " +
    "`Average Rain` = ?, " +
    "`Maximum Rain` = ?, " +
    "`Minimum Rain Water PH` = ?, " +
    "`Average RainWater PH` = ?, " +
    "`Maximum RainWater PH` = ?, " +
    "`Minimum WaterFlow Speed` = ?, " +
    "`Average WaterFlow Speed` = ?, " +
    "`Maximum WaterFlow Speed` = ?, " +
    "`Minimum Water Level` = ?, " +
    "`Average Water Level` = ?, " +
    "`Maximum Water Level` = ?, " +
    "`Minimum Ph of RiverWater` = ?, " +
    "`Average Ph of RiverWater` = ?, " +
    "`Total Floods` = ?, " +
    "`Maximum Ph of RiverWater` = ?, " +
    "`Flood Intensity` = ?, " +
    "`Age` = ?, " +
    "`Concrete Type` = ?, " +
    "`Rated_Load_Capacity` = ?, " +
    "`Expiry_Date` = ?, " +
    "`Minimum Traffic Volume` = ?, " +
    "`Average Traffic Volume` = ?, " +
    "`Maximum Traffic Volume` = ?, " +
    "`Minimum Traffic Load` = ?, " +
    "`Average Traffic Load` = ?, " +
    "`Maximum Traffic Load` = ?, " +
    "`Speed Limit` = ?, " +
    "`No of Maintenance` = ?, " +
    "`Average Time Gap in Maintenance` = ? " +
    "WHERE `ID` = ?"
);

// Set the parameters
p.setDouble(1, d.getMinTemp());
p.setDouble(2, d.getAvgTemp());
p.setDouble(3, d.getMaxTemp());
p.setDouble(4, d.getMinAbsHum());
p.setDouble(5, d.getAvgAbsHum());
p.setDouble(6, d.getMaxAbsHum());
p.setDouble(7, d.getMinRelHum());
p.setDouble(8, d.getAvgRelHum());
p.setDouble(9, d.getMaxRelHum());
p.setDouble(10, d.getMinWindSpeed());
p.setDouble(11, d.getAvgWindSpeed());
p.setDouble(12, d.getMaxWindSpeed());
p.setDouble(13, d.getMinNO2());
p.setDouble(14, d.getAvgNO2());
p.setDouble(15, d.getMaxNO2());
p.setDouble(16, d.getMinSO2());
p.setDouble(17, d.getAvgSO2());
p.setDouble(18, d.getMaxSO2());
p.setDouble(19, d.getMinCO());
p.setDouble(20, d.getAvgCO());
p.setDouble(21, d.getMaxCO());
p.setDouble(22, d.getMinCO2());
p.setDouble(23, d.getAvgCO2());
p.setDouble(24, d.getMaxCO2());
p.setDouble(25, d.getMinRain());
p.setDouble(26, d.getAvgRain());
p.setDouble(27, d.getMaxRain());
p.setDouble(28, d.getMinRainPh());
p.setDouble(29, d.getAvgRainPh());
p.setDouble(30, d.getMaxRainPh());
p.setDouble(31, d.getMinWaterFlowSpeed());
p.setDouble(32, d.getAvgWaterFlowSpeed());
p.setDouble(33, d.getMaxWaterFlowSpeed());
p.setDouble(34, d.getMinWaterLevel());
p.setDouble(35, d.getAvgWaterLevel());
p.setDouble(36, d.getMaxWaterLevel());
p.setDouble(37, d.getMinRiverWaterPh());
p.setDouble(38, d.getAvgRiverWaterPh());
p.setDouble(39, d.getMaxRiverWaterPh());
p.setInt(40, d.getTotalFlood());
p.setFloat(41, d.getFloodIntensity());
p.setInt(42, d.getAge());
p.setString(43, d.getConcreteType());
p.setDouble(44, d.getRatedLoad());
p.setInt(55, d.getId()); // ID
p.setString(45, ""+d.getExpiaryDate()); // Assuming d.getExpiaryDate() is a LocalDate
p.setDouble(46, d.getMinTrafficVolume());
p.setDouble(47, d.getAvgTrafficVolume());
p.setDouble(48, d.getMaxTrafficVolume());
p.setDouble(49, d.getMinTrafficLoad());
p.setDouble(50, d.getAvgTrafficLoad());
p.setDouble(51, d.getMaxTrafficLoad());
p.setDouble(52, d.getSpeedLimit());
p.setInt(53, d.getNoOfMaintenance());
p.setDouble(54, d.getAverageTimeGapInMaintenance());

p.executeUpdate();

            System.out.println("\n\n\n\n"+sampleString);

            System.out.println("Record Updated.......");
            try{
                Thread.sleep(sleepTime);
            }catch(Exception e){
                e.printStackTrace();
            }

        }


    }
}



class AirQuality {

    // Replace with your OpenWeather API key
    private static final String API_KEY = "9a908774ef7e030eebf1742043ef2963";
    
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



class Connection {
    static java.sql.Connection con = null;



    public static java.sql.Connection getConnection() {
        if (con == null) {
            try {
                // Load the MySQL JDBC Driver
                Class.forName("com.mysql.cj.jdbc.Driver");
                System.out.println("Driver Loaded Successfully");

                // Establish connection to the database
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/bridge_maintainance", "root", "");
                System.out.println("Database Connection Established");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return con;
    }


}


class Data {
    private int id;
    private String name;
    private double lat;
    private double lon;
    private float minTemp;
    private float maxTemp;
    private float avgTemp;
    private float minAbsHum;
    private float avgAbsHum;
    private float maxAbsHum;
    private float minRelHum;
    private float avgRelHum;
    private float maxRelHum;
    private String windDirection;
    private String concreteType, designType;
    private float minWindSpeed, avgWindSpeed, maxWindSpeed, minNO2, avgNO2, maxNO2, minSO2, avgSO2, maxSO2, minCO, avgCO, maxCO, minCO2, avgCO2, maxCO2, minRain, avgRain, maxRain, minRainPh, avgRainPh, maxRainPh, minWaterFlowSpeed, avgWaterFlowSpeed, maxWaterFlowSpeed, minWaterLevel, avgWaterLevel, maxWaterLevel, minRiverWaterPh, avgRiverWaterPh, maxRiverWaterPh,  floodIntensity,   ratedLoad,  slabThickness,minTrafficLoad,  avgTrafficLoad, maxTrafficLoad, bearSurface, length, width, height, remainingLifeSpan ,averageTimeGapInMaintenance;
    private int noOfBeams,totalFlood ,minTrafficVolume, avgTrafficVolume, maxTrafficVolume,  speedLimit, noOfMaintenance, expiaryDate, durability,age ;
    private LocalDate constructionDate;
    public Data(int id, String name, double lat, double lon, float minTemp,float avgTemp, float maxTemp,  float minAbsHum, 
                float avgAbsHum, float maxAbsHum, float minRelHum, float avgRelHum, float maxRelHum, String windDirection, 
                float minWindSpeed, float avgWindSpeed, float maxWindSpeed, float minNO2, float avgNO2, float maxNO2, 
                float minSO2, float avgSO2, float maxSO2, float minCO, float avgCO, float maxCO, float minCO2, float avgCO2, 
                float maxCO2, float minRain, float avgRain, float maxRain, float minRainPh, float avgRainPh, float maxRainPh, 
                float minWaterFlowSpeed, float avgWaterFlowSpeed, float maxWaterFlowSpeed, float minWaterLevel, 
                float avgWaterLevel, float maxWaterLevel, float minRiverWaterPh, float avgRiverWaterPh, float maxRiverWaterPh, 
                int totalFlood, float floodIntensity, int age, String concreteType, String designType, float ratedLoad, 
                int expiaryDate, float slabThickness, float bearSurface,int noOfBeams, float length, float width, float height, int minTrafficVolume, int avgTrafficVolume, int maxTrafficVolume,float minTrafficLoad, float avgTrafficLoad, float maxTrafficLoad, int speedLimit, int noOfMaintenance, float averageTimeGapInMaintenance,String constructionDate) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.avgTemp = avgTemp;
        this.minAbsHum = minAbsHum;
        this.avgAbsHum = avgAbsHum;
        this.maxAbsHum = maxAbsHum;
        this.minRelHum = minRelHum;
        this.avgRelHum = avgRelHum;
        this.maxRelHum = maxRelHum;
        this.windDirection = windDirection;
        this.minWindSpeed = minWindSpeed;
        this.avgWindSpeed = avgWindSpeed;
        this.maxWindSpeed = maxWindSpeed;
        this.minNO2 = minNO2;
        this.avgNO2 = avgNO2;
        this.maxNO2 = maxNO2;
        this.minSO2 = minSO2;
        this.avgSO2 = avgSO2;
        this.maxSO2 = maxSO2;
        this.minCO = minCO;
        this.avgCO = avgCO;
        this.maxCO = maxCO;
        this.minCO2 = minCO2;
        this.avgCO2 = avgCO2;
        this.maxCO2 = maxCO2;
        this.minRain = minRain;
        this.avgRain = avgRain;
        this.maxRain = maxRain;
        this.minRainPh = minRainPh;
        this.avgRainPh = avgRainPh;
        this.maxRainPh = maxRainPh;
        this.minWaterFlowSpeed = minWaterFlowSpeed;
        this.avgWaterFlowSpeed = avgWaterFlowSpeed;
        this.maxWaterFlowSpeed = maxWaterFlowSpeed;
        this.minWaterLevel = minWaterLevel;
        this.avgWaterLevel = avgWaterLevel;
        this.maxWaterLevel = maxWaterLevel;
        this.minRiverWaterPh = minRiverWaterPh;
        this.avgRiverWaterPh = avgRiverWaterPh;
        this.maxRiverWaterPh = maxRiverWaterPh;
        this.totalFlood = totalFlood;
        this.floodIntensity = floodIntensity;
        this.age = age;
        this.concreteType = concreteType;
        this.designType = designType;
        this.ratedLoad = ratedLoad;
        this.expiaryDate = expiaryDate;
        this.slabThickness = slabThickness;
        this.bearSurface = bearSurface;
        this.length = length;
        this.width = width;
        this.height = height;
        this.remainingLifeSpan = remainingLifeSpan;
        this.noOfBeams = noOfBeams;
        this.minTrafficVolume = minTrafficVolume;
        this.avgTrafficVolume = avgTrafficVolume;
        this.maxTrafficVolume = maxTrafficVolume;
        this.minTrafficLoad = minTrafficLoad;
        this.avgTrafficLoad = avgTrafficLoad;
        this.maxTrafficLoad = maxTrafficLoad;
        this.speedLimit = speedLimit;
        this.noOfMaintenance = noOfMaintenance;
        this.averageTimeGapInMaintenance = averageTimeGapInMaintenance;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.constructionDate = LocalDate.parse(constructionDate, formatter);
        //this.constructionDate = new Date(""+constructionDate);

    }
// Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public void setMinTemp(float minTemp) {
        this.minTemp = minTemp;
    }

    public void setMaxTemp(float maxTemp) {
        this.maxTemp = maxTemp;
    }

    public void setAvgTemp(float avgTemp) {
        this.avgTemp = avgTemp;
    }

    public void setMinAbsHum(float minAbsHum) {
        this.minAbsHum = minAbsHum;
    }

    public void setAvgAbsHum(float avgAbsHum) {
        this.avgAbsHum = avgAbsHum;
    }

    public void setMaxAbsHum(float maxAbsHum) {
        this.maxAbsHum = maxAbsHum;
    }

    public void setMinRelHum(float minRelHum) {
        this.minRelHum = minRelHum;
    }

    public void setAvgRelHum(float avgRelHum) {
        this.avgRelHum = avgRelHum;
    }

    public void setMaxRelHum(float maxRelHum) {
        this.maxRelHum = maxRelHum;
    }

    public void setWindDirection(String windDirection) {
        this.windDirection = windDirection;
    }

    public void setMinWindSpeed(float minWindSpeed) {
        this.minWindSpeed = minWindSpeed;
    }

    public void setAvgWindSpeed(float avgWindSpeed) {
        this.avgWindSpeed = avgWindSpeed;
    }

    public void setMaxWindSpeed(float maxWindSpeed) {
        this.maxWindSpeed = maxWindSpeed;
    }

    public void setMinNO2(float minNO2) {
        this.minNO2 = minNO2;
    }

    public void setAvgNO2(float avgNO2) {
        this.avgNO2 = avgNO2;
    }

    public void setMaxNO2(float maxNO2) {
        this.maxNO2 = maxNO2;
    }

    public void setMinSO2(float minSO2) {
        this.minSO2 = minSO2;
    }

    public void setAvgSO2(float avgSO2) {
        this.avgSO2 = avgSO2;
    }

    public void setMaxSO2(float maxSO2) {
        this.maxSO2 = maxSO2;
    }

    public void setMinCO(float minCO) {
        this.minCO = minCO;
    }

    public void setAvgCO(float avgCO) {
        this.avgCO = avgCO;
    }

    public void setMaxCO(float maxCO) {
        this.maxCO = maxCO;
    }

    public void setMinCO2(float minCO2) {
        this.minCO2 = minCO2;
    }

    public void setAvgCO2(float avgCO2) {
        this.avgCO2 = avgCO2;
    }

    public void setMaxCO2(float maxCO2) {
        this.maxCO2 = maxCO2;
    }

    public void setMinRain(float minRain) {
        this.minRain = minRain;
    }

    public void setAvgRain(float avgRain) {
        this.avgRain = avgRain;
    }

    public void setMaxRain(float maxRain) {
        this.maxRain = maxRain;
    }

    public void setMinRainPh(float minRainPh) {
        this.minRainPh = minRainPh;
    }

    public void setAvgRainPh(float avgRainPh) {
        this.avgRainPh = avgRainPh;
    }

    public void setMaxRainPh(float maxRainPh) {
        this.maxRainPh = maxRainPh;
    }

    public void setMinWaterFlowSpeed(float minWaterFlowSpeed) {
        this.minWaterFlowSpeed = minWaterFlowSpeed;
    }

    public void setAvgWaterFlowSpeed(float avgWaterFlowSpeed) {
        this.avgWaterFlowSpeed = avgWaterFlowSpeed;
    }

    public void setMaxWaterFlowSpeed(float maxWaterFlowSpeed) {
        this.maxWaterFlowSpeed = maxWaterFlowSpeed;
    }

    public void setMinWaterLevel(float minWaterLevel) {
        this.minWaterLevel = minWaterLevel;
    }

    public void setAvgWaterLevel(float avgWaterLevel) {
        this.avgWaterLevel = avgWaterLevel;
    }

    public void setMaxWaterLevel(float maxWaterLevel) {
        this.maxWaterLevel = maxWaterLevel;
    }

    public void setMinRiverWaterPh(float minRiverWaterPh) {
        this.minRiverWaterPh = minRiverWaterPh;
    }

    public void setAvgRiverWaterPh(float avgRiverWaterPh) {
        this.avgRiverWaterPh = avgRiverWaterPh;
    }

    public void setMaxRiverWaterPh(float maxRiverWaterPh) {
        this.maxRiverWaterPh = maxRiverWaterPh;
    }

    public void setTotalFlood(int totalFlood) {
        this.totalFlood = totalFlood;
    }

    public void setFloodIntensity(float floodIntensity) {
        this.floodIntensity = floodIntensity;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setConcreteType(String concreteType) {
        this.concreteType = concreteType;
    }

    public void setDesignType(String designType) {
        this.designType = designType;
    }

    public void setRatedLoad(float ratedLoad) {
        this.ratedLoad = ratedLoad;
    }

    public void setExpiaryDate(int expiaryDate) {
        this.expiaryDate = expiaryDate;
    }

    public void setSlabThickness(float slabThickness) {
        this.slabThickness = slabThickness;
    }

    public void setBearSurface(float bearSurface) {
        this.bearSurface = bearSurface;
    }

    public void setLength(float length) {
        this.length = length;
    }

    public void setWidth(float width) {
        this.width = width;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public void setRemainingLifeSpan(float remainingLifeSpan) {
        this.remainingLifeSpan = remainingLifeSpan;
    }

    public void setNoOfBeams(int noOfBeams) {
        this.noOfBeams = noOfBeams;
    }

    public void setMinTrafficVolume(int minTrafficVolume) {
        this.minTrafficVolume = minTrafficVolume;
    }

    public void setAvgTrafficVolume(int avgTrafficVolume) {
        this.avgTrafficVolume = avgTrafficVolume;
    }

    public void setMaxTrafficVolume(int maxTrafficVolume) {
        this.maxTrafficVolume = maxTrafficVolume;
    }

    public void setMinTrafficLoad(float minTrafficLoad) {
        this.minTrafficLoad = minTrafficLoad;
    }

    public void setAvgTrafficLoad(float avgTrafficLoad) {
        this.avgTrafficLoad = avgTrafficLoad;
    }

    public void setMaxTrafficLoad(float maxTrafficLoad) {
        this.maxTrafficLoad = maxTrafficLoad;
    }

    public void setSpeedLimit(int speedLimit) {
        this.speedLimit = speedLimit;
    }

    public void setNoOfMaintenance(int noOfMaintenance) {
        this.noOfMaintenance = noOfMaintenance;
    }

    public void setAverageTimeGapInMaintenance(int averageTimeGapInMaintenance) {
        this.averageTimeGapInMaintenance = averageTimeGapInMaintenance;
    }

    public void setDurability(int durability) {
        this.durability = durability;
    }


 // Getters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

    public float getMinTemp() {
        return minTemp;
    }

    public float getMaxTemp() {
        return maxTemp;
    }

    public float getAvgTemp() {
        return avgTemp;
    }

    public float getMinAbsHum() {
        return minAbsHum;
    }

    public float getAvgAbsHum() {
        return avgAbsHum;
    }

    public float getMaxAbsHum() {
        return maxAbsHum;
    }

    public float getMinRelHum() {
        return minRelHum;
    }

    public float getAvgRelHum() {
        return avgRelHum;
    }

    public float getMaxRelHum() {
        return maxRelHum;
    }

    public String getWindDirection() {
        return windDirection;
    }

    public float getMinWindSpeed() {
        return minWindSpeed;
    }

    public float getAvgWindSpeed() {
        return avgWindSpeed;
    }

    public float getMaxWindSpeed() {
        return maxWindSpeed;
    }

    public float getMinNO2() {
        return minNO2;
    }

    public float getAvgNO2() {
        return avgNO2;
    }

    public float getMaxNO2() {
        return maxNO2;
    }

    public float getMinSO2() {
        return minSO2;
    }

    public float getAvgSO2() {
        return avgSO2;
    }

    public float getMaxSO2() {
        return maxSO2;
    }

    public float getMinCO() {
        return minCO;
    }

    public float getAvgCO() {
        return avgCO;
    }

    public float getMaxCO() {
        return maxCO;
    }

    public float getMinCO2() {
        return minCO2;
    }

    public float getAvgCO2() {
        return avgCO2;
    }

    public float getMaxCO2() {
        return maxCO2;
    }

    public float getMinRain() {
        return minRain;
    }

    public float getAvgRain() {
        return avgRain;
    }

    public float getMaxRain() {
        return maxRain;
    }

    public float getMinRainPh() {
        return minRainPh;
    }

    public float getAvgRainPh() {
        return avgRainPh;
    }

    public float getMaxRainPh() {
        return maxRainPh;
    }

    public float getMinWaterFlowSpeed() {
        return minWaterFlowSpeed;
    }

    public float getAvgWaterFlowSpeed() {
        return avgWaterFlowSpeed;
    }

    public float getMaxWaterFlowSpeed() {
        return maxWaterFlowSpeed;
    }

    public float getMinWaterLevel() {
        return minWaterLevel;
    }

    public float getAvgWaterLevel() {
        return avgWaterLevel;
    }

    public float getMaxWaterLevel() {
        return maxWaterLevel;
    }

    public float getMinRiverWaterPh() {
        return minRiverWaterPh;
    }

    public float getAvgRiverWaterPh() {
        return avgRiverWaterPh;
    }

    public float getMaxRiverWaterPh() {
        return maxRiverWaterPh;
    }

    public int getTotalFlood() {
        return totalFlood;
    }

    public float getFloodIntensity() {
        return floodIntensity;
    }

    public int getAge() {
        return age;
    }

    public String getConcreteType() {
        return concreteType;
    }

    public String getDesignType() {
        return designType;
    }

    public float getRatedLoad() {
        return ratedLoad;
    }

    public int getExpiaryDate() {
        return expiaryDate;
    }

    public float getSlabThickness() {
        return slabThickness;
    }

    public float getBearSurface() {
        return bearSurface;
    }

    public float getLength() {
        return length;
    }

    public float getWidth() {
        return width;
    }

    public float getHeight() {
        return height;
    }

    public float getRemainingLifeSpan() {
        return remainingLifeSpan;
    }

    public int getNoOfBeams() {
        return noOfBeams;
    }

    public int getMinTrafficVolume() {
        return minTrafficVolume;
    }

    public int getAvgTrafficVolume() {
        return avgTrafficVolume;
    }

    public int getMaxTrafficVolume() {
        return maxTrafficVolume;
    }

    public float getMinTrafficLoad() {
        return minTrafficLoad;
    }

    public float getAvgTrafficLoad() {
        return avgTrafficLoad;
    }

    public float getMaxTrafficLoad() {
        return maxTrafficLoad;
    }

    public int getSpeedLimit() {
        return speedLimit;
    }

    public int getNoOfMaintenance() {
        return noOfMaintenance;
    }

    public float getAverageTimeGapInMaintenance() {
        return averageTimeGapInMaintenance;
    }

    public LocalDate getconstructionDate(){
        return this.constructionDate;
    }


}

class Humidity {

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


class WeatherUtils {
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

    public static double getRainfall(double latitude, double longitude) {
         String API_KEY = "3de6ecbc2b20683777161f67cd473a92"; // Replace with your OpenWeatherMap API key
        String API_URL = "https://api.openweathermap.org/data/2.5/weather";
        try {
            // Construct API URL
            String urlString = String.format("%s?lat=%.4f&lon=%.4f&appid=%s&units=metric", API_URL, latitude, longitude, API_KEY);
            URL url = new URI(urlString).toURL(); // Use URI.toURL() to handle deprecated URL constructor

            // Open HTTP connection
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            // Read API response
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Convert response to a string
            String jsonResponse = response.toString();

            // Manually extract the "rain" data using String operations
            String searchKey = "\"rain\":{\"1h\":";
            int startIndex = jsonResponse.indexOf(searchKey);
            if (startIndex != -1) {
                startIndex += searchKey.length();
                int endIndex = jsonResponse.indexOf("}", startIndex);
                String rainValue = jsonResponse.substring(startIndex, endIndex).trim();
                return Double.parseDouble(rainValue); // Convert to double
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0.0; // Return 0 if no rainfall data available
    }

}