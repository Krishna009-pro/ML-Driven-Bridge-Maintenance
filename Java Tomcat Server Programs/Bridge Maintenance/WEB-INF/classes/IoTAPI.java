import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;
import java.sql.*;
import java.net.*;
import java.util.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Duration;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


public class IoTAPI extends HttpServlet {
    
    java.sql.Connection con = null;
    

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Long w1 = Long.parseLong(request.getParameter("Cell1"));
        Long w2 = Long.parseLong(request.getParameter("Cell2"));
        String id = ""+request.getParameter("id");
        con = Connection.getConnection();

        try{
            
            Statement st = con.createStatement();

            ResultSet r = st.executeQuery("SELECT  `Minimum Traffic Load`, `Average Traffic Load`, `Maximum Traffic Load` FROM `bridge` WHERE `ID` = "+id);

            if(r.next()){
                Long MinLoad = r.getLong("Minimum Traffic Load");
                Long AvgLoad = r.getLong("Average Traffic Load");
                Long MaxLoad = r.getLong("Maximum Traffic Load");

                if(w1<0){
                    w1*=-1;
                }
                if(w2<0){
                    w2*=-1;
                }


                AvgLoad = (AvgLoad+w1+w2)/2;

                if (MinLoad > (w1+w2)){
                    MinLoad = w1+w2;
                }

                if (MaxLoad < (w1+w2)){
                    MaxLoad = w1+w2;
                }

                System.out.println("w1 = "+w1+"    w2 = "+w2+"   min = "+ MinLoad+"    avg = "+AvgLoad+ "    max = "+MaxLoad);


                int i = st.executeUpdate("UPDATE `bridge` SET `Minimum Traffic Load`='"+MinLoad+"',`Average Traffic Load`='"+AvgLoad+"',`Maximum Traffic Load`='"+MaxLoad+"' WHERE `ID` ="+id);
                System.out.println("Reocord Updated......."+i);

            }

            con.close();
        }catch(Exception e){
            e.printStackTrace();
        }





        
    }

}


