package weatherUpdation;
import java.util.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
public class Data {
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