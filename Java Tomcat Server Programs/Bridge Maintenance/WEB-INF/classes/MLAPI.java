import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;
import java.sql.*;
import java.net.*;
import java.util.*;
public class MLAPI extends HttpServlet {
    String data;
    String id;
    String serverAddress = "192.168.187.189"; 
    int serverPort = 12345;
    String message;
    String result;
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("UTF-8");
        id = request.getParameter("id");

        PrintWriter out = response.getWriter();
        


        try{
            java.sql.Connection con = Connection.getConnection();
            Statement st = con.createStatement();
            ResultSet r = st.executeQuery("SELECT * FROM `bridge` WHERE `ID` = "+id+";");

            r.next();

            message = "{"
                + "\"Age\": "+r.getString("Age")+","
                + "\"Rated_Load_Capacity\": "+r.getString("Rated_Load_Capacity")+","
                + "\"SlabThickness\": "+r.getString("Slab Thickness")+","
                + "\"Bear_Surface_Area\": "+r.getString("Bear_Surface_Area")+","
                + "\"No_Of_Beams\": "+r.getString("No_Of_Beams")+","
                + "\"Length\": "+r.getString("Length")+","
                + "\"Width\": "+r.getString("Width")+","
                + "\"Height\": "+r.getString("Height")+","
                + "\"MinimumTemperature\": "+r.getString("Minimum Temperature")+","
                + "\"AverageTemperature\": "+r.getString("Average Temperature")+","
                + "\"MaximumTemperature\": "+r.getString("Maximum Temperature")+","
                + "\"MinimumRelativeHumidity\": "+r.getString("Minimum Relative Humidity")+","
                + "\"AverageRelativeHumidity\": "+r.getString("Average Relative Humidity")+","
                + "\"MaximumRelativeHumidity\": "+r.getString("Maximum Relative Humidity")+","
                + "\"AverageWindSpeed\": "+r.getString("Average Wind Speed")+","
                + "\"MinimumNO2\": "+r.getString("Minimum NO2")+","
                + "\"AverageNO2\": "+r.getString("Average NO2")+","
                + "\"MaximumNO2\": "+r.getString("Maximum NO2")+","
                + "\"MinimumSO2\": "+r.getString("Minimum SO2")+","
                + "\"AverageSO2\": "+r.getString("Average SO2")+","
                + "\"MaximumSO2\": "+r.getString("Maximum SO2")+","
                + "\"MinimumCO\": "+r.getString("Minimum CO")+","
                + "\"AverageCO\": "+r.getString("Average CO")+","
                + "\"MaximumCO\": "+r.getString("Maximum CO")+","
                + "\"MinimumCO2\": "+r.getString("Minimum CO2")+","
                + "\"AverageCO2\": "+r.getString("Average CO2")+","
                + "\"MaximumCO2\": "+r.getString("Maximum CO2")+","
                + "\"MinimumRain\": "+r.getString("Minimum Rain")+","
                + "\"AverageRain\": "+r.getString("Average Rain")+","
                + "\"MaximumRain\": "+r.getString("Maximum Rain")+","
                + "\"MinimumWaterLevel\": "+r.getString("Minimum Water Level")+","
                + "\"AverageWaterLevel\": "+r.getString("Average Water Level")+","
                + "\"MaximumWaterLevel\": "+r.getString("Maximum Water Level")+","
                + "\"MinimumTrafficVolume\": "+r.getString("Minimum Traffic Load")+","
                + "\"AverageTrafficVolume\": "+r.getString("Average Traffic Load")+","
                + "\"MaximumTrafficVolume\": "+r.getString("Maximum Traffic Load")+","
                + "\"SpeedLimit\": "+r.getString("Speed Limit")+","
                + "\"No_of_Maintenance\": "+r.getString("No of Maintenance")+","
                + "\"No_Of_Vehicle_Passed\": "+r.getString("Average Time Gap in Maintenance")+","
                + "\"AverageTimeGapInMaintenance\": 1.5,"
                + "\"Crack_Surface_Area\": 50.0"
                + "}";;

            System.out.println(message);
            InetAddress localhost = InetAddress.getLocalHost();
            String serverAddress = ""+localhost.getHostAddress();
            System.out.println(serverAddress);
            int serverPort = 12345;
            
            DatagramSocket socket = new DatagramSocket();
            byte[] buffer = message.getBytes();
            InetAddress address = InetAddress.getByName(serverAddress);
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length, address, serverPort);
            socket.send(packet);
            System.out.println("Message sent to Python UDP server: " + message);
            byte[] responseBuffer = new byte[1024];
            DatagramPacket responsePacket = new DatagramPacket(responseBuffer, responseBuffer.length);
            socket.receive(responsePacket);
            result = new String(responsePacket.getData(), 0, responsePacket.getLength());
            
            System.out.println("Received processed message: " + result);
             String confirmation = "ACK";
            byte[] confirmationBuffer = confirmation.getBytes();
            DatagramPacket confirmationPacket = new DatagramPacket(
                confirmationBuffer, confirmationBuffer.length, address, serverPort
            );
            socket.send(confirmationPacket);
            System.out.println("Confirmation sent to server.");
            socket.close();

            result = result.replace("False", "false");
            result = result.replace("'", "\"");
            System.out.println("............................"+result);
            JSONObject jsonResponse = new JSONObject(result);
            String finalString = jsonResponse.toString();
            out.println(""+finalString);
            
            con.close();

        }catch(Exception e){
            
            e.printStackTrace();
        }
      
    }
}
