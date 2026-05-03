// MyServlet.java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class MyServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set response content type
        response.setContentType("text/html");
        // Get PrintWriter to send response to client
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello from MyServlet!</h1>");
        out.println("</body></html>");
    }
}
