import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.sql.*;

@WebServlet("/AssignMaintenance")
public class AssignMaintenace extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter writer = response.getWriter();

        try (java.sql.Connection con = Connection.getConnection()) {
            // Corrected: Only 7 placeholders for 7 columns
            String sql = "INSERT INTO `maintenance` (`bridge id`, `bridge name`, `assign user name`, `remaining lifespan`, `durability`, `assigned date`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?)";
            
            try (PreparedStatement ps = con.prepareStatement(sql)) {
                ps.setInt(1, Integer.parseInt(request.getParameter("bridge_id")));
                ps.setString(2, request.getParameter("bridge_name"));
                ps.setString(3, request.getParameter("engineer"));
                ps.setFloat(4, Float.parseFloat(request.getParameter("lifespan")));
                ps.setFloat(5, Float.parseFloat(request.getParameter("durability")));
                ps.setString(6, request.getParameter("date")); // fixed typo here
                ps.setString(7, "pending");



                int rows = ps.executeUpdate();


                if (rows > 0) {
                    // Successful insert, redirect to success page
                    response.sendRedirect("http://localhost:5173/ViewMaintenance");
                } else {
                    writer.println("<script>alert('Failed to assign maintenance.');</script>");
                }


                Statement st = con.createStatement();
                st.executeUpdate("UPDATE bridge SET `No of Maintenance` = `No of Maintenance` + 1 WHERE id = "+request.getParameter("bridge_id")+";");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            writer.println("<script>alert('Database error: " + e.getMessage() + "');</script>");
        }
    }
}
