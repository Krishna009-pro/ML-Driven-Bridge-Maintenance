import java.sql.*;

public class Connection {
    static java.sql.Connection con = null;



    public static java.sql.Connection getConnection() {
        
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
        
        return con;
    }


}