import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;
import java.sql.*;
import java.net.*;
import java.util.*;


@MultipartConfig(
    fileSizeThreshold = 1024 * 1024 * 2, // 2MB
    maxFileSize = 1024 * 1024 * 10,      // 10MB
    maxRequestSize = 1024 * 1024 * 50    // 50MB
)
public class PredictionAPI extends HttpServlet {
    String data;
    String id;
    //String serverAddress = "192.168.187.189"; 
    int serverPort = 12346;
    String message;
    String result;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("UTF-8");
        id = request.getParameter("id");
if (id == null || id.trim().isEmpty()) {
    System.out.println("❌ ERROR: Received null or empty ID from request.");
    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing ID parameter");
    return;
}


        System.out.println("Received ID: " + id);


        PrintWriter out = response.getWriter();
        




        try{


            String uploadPath = "C:/Users/shubh/OneDrive/Desktop/Major Project/1Project -org/Bridge Images/" + id;
            File uploadDir = new File(uploadPath);

            // ✅ If folder exists, delete it before recreating
            if (uploadDir.exists()) {
                deleteFolder(uploadDir);
                System.out.println("🗑️ Deleted existing folder: " + uploadPath);
            }

        // ✅ Create a fresh empty folder
        if (uploadDir.mkdir()) {
            System.out.println("📂 Created new folder: " + uploadPath);
        } else {
            System.out.println("❌ Failed to create folder: " + uploadPath);
            return;
        }


        System.out.println("File section comes");
        List<String> uploadedFiles = new ArrayList<>();

        for (Part part : request.getParts()) {
            System.out.println("fetching files ...............");
            if (part.getName().equals("images") && part.getSize() > 0) {
                String fileName = System.currentTimeMillis() + "_" + part.getSubmittedFileName();
                String filePath = uploadPath + "/" + fileName;
                part.write(filePath);  // ✅ Save file
                uploadedFiles.add(filePath);
                System.out.println("📸 Image saved: " + filePath);
            }
        }

        System.out.println("outside the fetching bloack");

            java.sql.Connection con = Connection.getConnection();
            Statement st = con.createStatement();
            System.out.println("id = "+id);
            ResultSet r = st.executeQuery("SELECT * FROM `bridge` WHERE `ID` = "+id+";");

            r.next();

            String message = "{ " +
        "\"YearBuilt\": \"" + r.getString("Construction Date") + "\"," +
        "\"Age\": " + r.getInt("Age") + "," +
        "\"ConcreteType\": \"" + r.getString("Concrete Type") + "\"," +
        "\"DesignType\": \"" + r.getString("Design Type") + "\"," +
        "\"Rated_Load_Capacity\": " + r.getFloat("Rated_Load_Capacity") + "," +
        "\"SlabThickness\": " + r.getFloat("Slab Thickness") + "," +
        "\"Bear_Surface_Area\": " + r.getFloat("Bear_Surface_Area") + "," +
        "\"No_Of_Beams\": " + r.getInt("No_Of_Beams") + "," +
        "\"Length\": " + r.getFloat("Length") + "," +
        "\"Width\": " + r.getFloat("Width") + "," +
        "\"Height\": " + r.getFloat("Height") + "," +
        "\"MinimumTemperature\": " + r.getFloat("Minimum Temperature") + "," +
        "\"AverageTemperature\": " + r.getFloat("Average Temperature") + "," +
        "\"MaximumTemperature\": " + r.getFloat("Maximum Temperature") + "," +
        "\"MinimumRelativeHumidity\": " + r.getFloat("Minimum Relative Humidity") + "," +
        "\"AverageRelativeHumidity\": " + r.getFloat("Average Relative Humidity") + "," +
        "\"MaximumRelativeHumidity\": " + r.getFloat("Maximum Relative Humidity") + "," +
        "\"AverageWindSpeed\": " + r.getFloat("Average Wind Speed") + "," +
        "\"MinimumNO2\": " + r.getFloat("Minimum NO2") + "," +
        "\"AverageNO2\": " + r.getFloat("Average NO2") + "," +
        "\"MaximumNO2\": " + r.getFloat("Maximum NO2") + "," +
        "\"MinimumSO2\": " + r.getFloat("Minimum SO2") + "," +
        "\"AverageSO2\": " + r.getFloat("Average SO2") + "," +
        "\"MaximumSO2\": " + r.getFloat("Maximum SO2") + "," +
        "\"MinimumCO\": " + r.getFloat("Minimum CO") + "," +
        "\"AverageCO\": " + r.getFloat("Average CO") + "," +
        "\"MaximumCO\": " + r.getFloat("Maximum CO") + "," +
        "\"MinimumCO2\": " + r.getFloat("Minimum CO2") + "," +
        "\"AverageCO2\": " + r.getFloat("Average CO2") + "," +
        "\"MaximumCO2\": " + r.getFloat("Maximum CO2") + "," +
        "\"MinimumRain\": " + r.getFloat("Minimum Rain") + "," +
        "\"AverageRain\": " + r.getFloat("Average Rain") + "," +
        "\"MaximumRain\": " + r.getFloat("Maximum Rain") + "," +
        "\"MinimumWaterLevel\": " + r.getFloat("Minimum Water Level") + "," +
        "\"AverageWaterLevel\": " + r.getFloat("Average Water Level") + "," +
        "\"MaximumWaterLevel\": " + r.getFloat("Maximum Water Level") + "," +
        "\"MinimumTrafficVolume\": " + r.getFloat("Minimum Traffic Load") + "," +
        "\"AverageTrafficVolume\": " + r.getFloat("Average Traffic Load") + "," +
        "\"MaximumTrafficVolume\": " + r.getFloat("Maximum Traffic Load") + "," +
        "\"SpeedLimit\": " + r.getInt("Speed Limit") + "," +
        "\"No_of_Maintenance\": " + r.getInt("No of Maintenance") + "," +
        "\"No_Of_Vehicle_Passed\": " + r.getInt("Average Traffic Volume") + "," +
        "\"AverageTimeGapInMaintenance\": " + r.getFloat("Average Time Gap in Maintenance") + "," +
        "\"Ultrasonic Testing (UT)\": \"" + request.getParameter("UT") + "\"," +
        "\"Ground Penetrating Radar (GPR)\": \"" + request.getParameter("GPR") + "\"," +
        "\"Acoustic Emission (AE) Testing\": \"" + request.getParameter("AE") + "\"," +
        "\"Rebound Hammer Test (Schmidt Hammer Test)\": \"" + request.getParameter("SHT") + "\"," +
        "\"Crack_Surface_Area\": 10 ," +
        "\"Path\": \"" + uploadPath + "\"" +
        "}"; 


            //System.out.println(message);
            InetAddress localhost = InetAddress.getLocalHost();
            String serverAddress = ""+localhost.getHostAddress();
            System.out.println(serverAddress);
            int serverPort = 12346;
            
            DatagramSocket socket = new DatagramSocket();
            byte[] buffer = message.getBytes();
            InetAddress address = InetAddress.getByName(serverAddress);
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length, address, serverPort);
            socket.send(packet);
            //System.out.println("Message sent to Python UDP server: " + message);
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


        }catch(Exception e){
            
            e.printStackTrace();
        }
      
    }

    private void deleteFolder(File folder) {
        File[] files = folder.listFiles();
        if (files != null) { 
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteFolder(file); // Recursively delete subdirectories
                }
                file.delete();
            }
        }
        folder.delete(); // Finally delete the empty folder
    }

}
