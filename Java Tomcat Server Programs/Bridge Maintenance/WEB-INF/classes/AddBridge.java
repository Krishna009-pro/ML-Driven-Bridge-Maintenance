
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import java.util.*;

public class AddBridge extends HttpServlet  {

     protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        Data d = new Data();
        int c = 0;
        
        Exception e1;
        try{
            d.setName(""+request.getParameter("BridgeName"));
            d.setLat(Double.parseDouble(request.getParameter("Lattitude")));
            d.setLon(Double.parseDouble(request.getParameter("Longitude")));
            float lat = (float)d.getLat();
            float lon = (float)d.getLon();
            float temp =WeatherUtils.getTemperature(lat,lon);
            d.setMinTemp(temp);
            d.setAvgTemp(temp);
            d.setMaxTemp(temp);

            float Absolutehumidity = (float)Humidity.getAbsoluteHumidity(lat,lon), Relativehumidity = (float)Humidity.getRelativeHumidity(lat,lon);
            d.setMinAbsHum(Absolutehumidity);
            d.setAvgAbsHum(Absolutehumidity);
            d.setMaxAbsHum(Absolutehumidity);

            d.setMinRelHum(Relativehumidity);
            d.setAvgRelHum(Relativehumidity);
            d.setMaxRelHum(Relativehumidity);

            float windSpeed = weather.getWindSpeed((float)lat,(float)lon);
            d.setMinWindSpeed(windSpeed);
            d.setAvgWindSpeed(windSpeed);
            d.setMaxWindSpeed(windSpeed);

            d.setWindDirection("none");

            float NO2 =(float) AirQuality.getNO2(d.getLat(),d.getLon()),SO2= (float)AirQuality.getSO2(d.getLat(),d.getLon());
            float CO = (float)AirQuality.getCO(d.getLat(),d.getLon()),CO2 =(float) AirQuality.getCO2(d.getLat(),d.getLon());

            d.setMinNO2(NO2);
            d.setAvgNO2(NO2);
            d.setMaxNO2(NO2);

            d.setMinSO2(SO2);
            d.setAvgSO2(SO2);
            d.setMaxSO2(SO2);

            d.setMinCO(CO);
            d.setAvgCO(CO);
            d.setMaxCO(CO);

            d.setMinCO2(CO2);
            d.setAvgCO2(CO2);
            d.setMaxCO2(CO2);

            float rain =Rain.getTotalRain((float)lat,(float)lon);

            d.setMinRain(rain);
            d.setAvgRain(rain);
            d.setMaxRain(rain);

            d.setMinRainPh(7.0f);
            d.setAvgRainPh(7.0f);
            d.setMaxRainPh(7.0f);

            d.setMinWaterFlowSpeed (-1.0f);
            d.setAvgWaterFlowSpeed(-1.0f);
            d.setMaxWaterFlowSpeed(-1.0f);

            d.setMinWaterLevel(-1.0f);
            d.setAvgWaterLevel(-1.0f);
            d.setMaxWaterLevel(-1.0f);

            d.setMinRiverWaterPh(-1.0f);
            d.setAvgRiverWaterPh(-1.0f);
            d.setMaxRiverWaterPh(-1.0f);

            d.setTotalFlood(0);
            d.setFloodIntensity(0.00f);

            d.setAge(0);

            d.setConcreteType(request.getParameter("ConcreteType"));
            d.setDesignType(request.getParameter("DesignType"));
            d.setRatedLoad(Float.parseFloat(request.getParameter("RatedLoadCapacity")));
            d.setExpiaryDate(-22);
            d.setSlabThickness(Float.parseFloat(request.getParameter("SlabThickness")));
            d.setBearSurface(Float.parseFloat(request.getParameter("BearSurfaceArea")));
            d.setLength(Float.parseFloat(request.getParameter("Length")));
            d.setWidth(Float.parseFloat(request.getParameter("Width")));
            d.setHeight(Float.parseFloat(request.getParameter("Height")));
            d.setRemainingLifeSpan(-1);
            d.setNoOfBeams(Integer.parseInt(request.getParameter("NOOfBeams")));
            
            d.setMinTrafficVolume(-1);
            d.setAvgTrafficVolume(-1);
            d.setMaxTrafficVolume(-1);
            d.setMinTrafficLoad(-1);
            d.setAvgTrafficLoad(-1);
            d.setMaxTrafficLoad(-1);
            d.setSpeedLimit(Integer.parseInt(request.getParameter("SpeedLimit")));
            d.setNoOfMaintenance(0);
            d.setAverageTimeGapInMaintenance(0);
            d.setDurability(-1);



            java.sql.Connection con = Connection.getConnection();
            String query = "INSERT INTO `bridge` ( `Name`, `Construction Date`, `Lattitude`, `Longitude`, `Minimum Temperature`, `Average Temperature`, `Maximum Temperature`, `Minimum Absolute Humidity`, `Average Absolute Humidity`, `Maximum Absolute Humidity`, `Minimum Relative Humidity`, `Average Relative Humidity`, `Maximum Relative Humidity`, `Wind Direction`, `Minimum Wind Speed`, `Average Wind Speed`, `Maximum Wind Speed`, `Minimum NO2`, `Average NO2`, `Maximum NO2`, `Minimum SO2`, `Average SO2`, `Maximum SO2`, `Minimum CO`, `Average CO`, `Maximum CO`, `Minimum CO2`, `Average CO2`, `Maximum CO2`, `Minimum Rain`, `Average Rain`, `Maximum Rain`, `Minimum Rain Water PH`, `Average RainWater PH`, `Maximum RainWater PH`, `Minimum WaterFlow Speed`, `Average WaterFlow Speed`, `Maximum WaterFlow Speed`, `Minimum Water Level`, `Average Water Level`, `Maximum Water Level`, `Minimum Ph of RiverWater`, `Average Ph of RiverWater`, `Maximum Ph of RiverWater`, `Total Floods`, `Flood Intensity`, `Age`, `Concrete Type`, `Design Type`, `Rated_Load_Capacity`, `Expiry_Date`, `Slab Thickness`, `Bear_Surface_Area`, `No_Of_Beams`, `Length`, `Width`, `Height`, `Minimum Traffic Volume`, `Average Traffic Volume`, `Maximum Traffic Volume`, `Minimum Traffic Load`, `Average Traffic Load`, `Maximum Traffic Load`, `Speed Limit`, `No of Maintenance`, `Average Time Gap in Maintenance`,`Status`) "+ "VALUES ('" + d.getName() + "', '" + request.getParameter("ConstructionDate") + "', '" + d.getLat() + "', '" +         d.getLon() + "', '"+ d.getMinTemp() + "', '" + d.getAvgTemp() + "', '" + d.getMaxTemp() + "', '" + d.getMinAbsHum()        + "', '" + d.getAvgAbsHum() + "', '"+ d.getMaxAbsHum() + "', '" + d.getMinRelHum() + "', '" + d.getAvgRelHum() + "', '" + d.        getMaxRelHum() + "', '" + d.getWindDirection() + "', '" + d.getMinWindSpeed() + "', '" + d.getAvgWindSpeed() + "', '" +         d.getMaxWindSpeed() + "', '"+ d.getMinNO2() + "', '" + d.getAvgNO2() + "', '" + d.getMaxNO2() + "', '" + d.getMinSO2() + "',        '" + d.getAvgSO2() + "', '"+ d.getMaxSO2() + "', '" + d.getMinCO() + "', '" + d.getAvgCO() + "', '" + d.getMaxCO() + "', '"        + d.getMinCO2() + "', '"+ d.getAvgCO2() + "', '" + d.getMaxCO2() + "', '" + d.getMinRain() + "', '" + d.getAvgRain() +      "', '" + d.getMaxRain() + "', '"+ d.getMinRainPh() + "', '" + d.getAvgRainPh() + "', '" + d.getMaxRainPh() + "', '" + d.        getMinWaterFlowSpeed() + "', '"+ d.getAvgWaterFlowSpeed() + "', '" + d.getMaxWaterFlowSpeed() + "', '" + d.getMinWaterLevel() +        "', '" + d.getAvgWaterLevel() + "', '"+ d.getMaxWaterLevel() + "', '" + d.getMinRiverWaterPh() + "', '" + d.getAvgRiverWaterPh() + "',        '" + d.getMaxRiverWaterPh() + "', '"+ d.getTotalFlood() + "', '" + d.getFloodIntensity() + "', '" + d.getAge() + "', '" + d.        getConcreteType() + "', '"+ d.getDesignType() + "', '" + d.getRatedLoad() + "', '" + d.getExpiaryDate() + "', '" + d.     getSlabThickness() + "', '"+ d.getBearSurface() + "', '" + d.getNoOfBeams() + "', '" + d.getLength() + "', '" + d.getWidth     () + "', '" + d.getHeight() + "', '"+ d.getMinTrafficVolume() + "', '" + d.getAvgTrafficVolume() + "', '" + d.getMaxTrafficVolume()         + "', '" + d.getMinTrafficLoad() + "', '"+ d.getAvgTrafficLoad() + "', '" + d.getMaxTrafficLoad() + "', '" + d.getSpeedLimit() + "', '" +        d.getNoOfMaintenance() + "', '"+ d.getAverageTimeGapInMaintenance() + "','Working')";

            PreparedStatement p = con.prepareStatement(query);
            c = p.executeUpdate();

        }catch(Exception e){
            e.printStackTrace();
            e1 =e ;
        }
        out.println("<html><head><title>Error</title></head><body>");
        if(c !=1 ){
            
            out.println("<script>alert('Error')</script>");
            
        }else{
            out.println("<script>alert('Data inserted');</script>");
        }
        out.println("</body></html>");
        response.sendRedirect("http://localhost:5173/ViewBridge");





    }
    
}
