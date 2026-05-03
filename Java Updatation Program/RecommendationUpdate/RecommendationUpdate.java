
import java.sql.*;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;


import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.io.IOException;


public class RecommendationUpdate{
    static String apiUrl = "http://localhost:8080/Bridge%20Maintenance/MLAPI?id=";
    static int count = 0;
    static java.sql.Connection con;
    static int Bid;
    static Statement st;
    public static void main(String ar[])throws Exception{
        
        con = Connection.getConnection();
        while (true){
             

            try{

                
                st = con.createStatement();
                System.out.println("Hello1");
                ResultSet r = st.executeQuery("SELECT COUNT(*) FROM `bridge`;");
                r.next();
                count = r.getInt(1);   

            for (int i = 1;i<=count;i++){

            

                PreparedStatement p = con.prepareStatement("INSERT INTO `recommendation`(`BridgeId`,    `ScanDate`, `Remaining Lifespan`, `Durability`, `Status`,`Bridge Name`) VALUES (?,?,?,?,'remaining',?)");


                    apiUrl = "http://localhost:8080/Bridge%20Maintenance/MLAPI?id="+i;
                    URL url = new URL(apiUrl);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");

                    BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    String inputLine;
                    StringBuilder response = new StringBuilder();

                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);
                    }
                    in.close();

                    String jsonResponse = response.toString();

                    // Extract values manually
                    System.out.println("jsonresponse" + jsonResponse);
                    String lifespanStr = jsonResponse.split(",")[0].split(":")[1];
                    System.out.println(""+lifespanStr);
                    String maintenanceStr = jsonResponse.split(",")[1].split(":")[1];
                    System.out.println(""+maintenanceStr);
                    String durabilityStr = jsonResponse.split(",")[2].split(":")[1].split("}")[0];
                    System.out.println(""+durabilityStr);

                    double predictedLifespan = Double.parseDouble(lifespanStr);
                    boolean maintenanceRequired = Boolean.parseBoolean(maintenanceStr);
                    double predictedDurability = Double.parseDouble(durabilityStr);

                    if(maintenanceRequired){
                        Boolean bool = true;

                        Statement stchech = con.createStatement();
                        ResultSet r2 = stchech.executeQuery("SELECT `RecId` FROM `recommendation` WHERE `BridgeId` = '"+i+"' AND `Status` = 'remaining'");
                        if(r2.next()){
                            bool = false;
                        }
                        if(bool){
                            System.out.println("Inside the maintenance required");
                            p.setInt(1,i);
                            LocalDate localDate = LocalDate.now();
                            Date sqlDate = Date.valueOf(localDate);    
                            p.setDate(2,sqlDate);
                            p.setDouble(3, predictedDurability);
                            p.setDouble(4,predictedLifespan);

                            Statement st = con.createStatement();
                            ResultSet r3 = st.executeQuery("SELECT  `Name` FROM `bridge` WHERE `ID` ="+i);
                            System.out.println("SELECT  `Name` FROM `bridge` WHERE `ID` ="+i);
                            r3.next();
                            System.out.println("hello");
                            p.setString(5,r3.getString(1));


                            p.executeUpdate();
                        }
                    }

            }
                    Thread.sleep(50000);
                
                }
                catch(Exception e){
                    e.printStackTrace();
                    Thread.sleep(100000);
                }
            
        }
    }
}



public class Connection {
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