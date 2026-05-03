import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;
import java.sql.*;

@MultipartConfig(
    fileSizeThreshold = 1024 * 1024 * 2, // 2MB
    maxFileSize = 1024 * 1024 * 10,      // 10MB
    maxRequestSize = 1024 * 1024 * 50    // 50MB
)
public class AddUser extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter writer = response.getWriter();

        // Directory setup
        String imagePath = getServletContext().getRealPath("/WEB-INF/classes/images/");
        File directory = new File(imagePath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Retrieve form parameters
        String name = request.getParameter("UserName");
        String pass = request.getParameter("password");
        String contact = request.getParameter("ContactNo");
        String email = request.getParameter("EmailId");
        String birth = request.getParameter("BirthDate");
        String role = request.getParameter("Role");

        if (name == null || pass == null || contact == null || email == null || birth == null || role == null) {
            System.out.println("name = "+name);
            System.out.println("pass = "+pass);
            System.out.println("contact = "+ contact);
            System.out.println("Email = "+email);
            System.out.println("birth = "+birth);
            System.out.println("role = "+role);
            throw new ServletException("Missing form parameters");
        }

        
        File file = new File(directory, name + ".jpg");
        try {
            Part filePart = request.getPart("image");
            if (filePart == null || filePart.getSize() == 0) {
                throw new ServletException("File upload is required");
            }


				InputStream inputStream = filePart.getInputStream();
				BufferedInputStream in = new BufferedInputStream(inputStream);
				
				file.createNewFile();
				BufferedOutputStream out = new BufferedOutputStream( new FileOutputStream(file));
				
				
				byte b[] = new byte[5000];
				int byteCount;
				while((byteCount= in.read(b))!=-1){
					out.write(b,0,byteCount);
				}

        } catch (IOException e) {
            e.printStackTrace();
            throw new ServletException("Error saving file: " + file.getAbsolutePath(), e);
        }

        // Save user data into the database
        try (java.sql.Connection con = Connection.getConnection()) {
            String sql = "INSERT INTO users (`Name`, `Password`, `Contact no`, `Email Id`, `Birth Date`, `Role`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement ps = con.prepareStatement(sql)) {
                ps.setString(1, name);
                ps.setString(2, pass);
                ps.setString(3, contact);
                ps.setString(4, email);
                ps.setString(5, birth);
                ps.setString(6, role);
                ps.setString(7, file.getAbsolutePath());

                int rows = ps.executeUpdate();
                if (rows > 0) {
                    response.setContentType("text/javascript");
                    writer.println("alert(User added successfully!);");
                    
                } else {
                    writer.println("Failed to add user.");
                }

                response.sendRedirect("localhost:5173/ViewUser");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new ServletException("Database error", e);
        }
    }
}
