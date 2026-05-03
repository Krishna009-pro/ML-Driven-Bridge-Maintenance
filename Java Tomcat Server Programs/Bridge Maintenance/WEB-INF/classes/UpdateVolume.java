import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;
import java.sql.*;
import java.net.*;


public class UpdateVolume extends HttpServlet {
    
    java.sql.Connection con = null;


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try{
            con = Connection.getConnection();
            Long l = Long.parseLong(request.getParameter("count"));
            int id = Integer.parseInt(request.getParameter("id"));
            Statement st = con.createStatement();
            ResultSet r = st.executeQuery("SELECT  `Minimum Traffic Volume`, `Average Traffic Volume`, `Maximum Traffic Volume` FROM `bridge` WHERE `ID` ="+id);
            if(r.next()){
                long min = r.getLong("Minimum Traffic Volume");
                long avg = r.getLong("Average Traffic Volume");
                long max = r.getLong("Maximum Traffic Volume");

                if (l<min){
                    min =l;
                }
                if(l>max){
                    max = l;
                }
                avg = (avg+l)/2;

                st.executeUpdate("UPDATE `bridge` SET `Minimum Traffic Volume`='"+min+"',`Average Traffic Volume`='"+avg+"',`Maximum Traffic Volume`='"+max+"' WHERE `ID` = "+id);
                    
                System.out.println("Record Inserted...... for Volume");
                
            }

            con.close();
        }catch(Exception e){
            e.printStackTrace();
    }





        
    }

}


