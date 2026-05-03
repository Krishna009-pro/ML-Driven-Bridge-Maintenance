import java.io.*;
import java.net.*;

public class test {
    public static void main(String ar[]) throws Exception {
        String message = "{"
                + "\"Age\": 25,"
                + "\"Rated_Load_Capacity\": 150,"
                + "\"SlabThickness\": 0.5,"
                + "\"Bear_Surface_Area\": 2000,"
                + "\"No_Of_Beams\": 10,"
                + "\"Length\": 500,"
                + "\"Width\": 30,"
                + "\"Height\": 50,"
                + "\"MinimumTemperature\": 5,"
                + "\"AverageTemperature\": 15,"
                + "\"MaximumTemperature\": 25,"
                + "\"MinimumRelativeHumidity\": 40,"
                + "\"AverageRelativeHumidity\": 60,"
                + "\"MaximumRelativeHumidity\": 80,"
                + "\"AverageWindSpeed\": 10,"
                + "\"MinimumNO2\": 10,"
                + "\"AverageNO2\": 20,"
                + "\"MaximumNO2\": 30,"
                + "\"MinimumSO2\": 2,"
                + "\"AverageSO2\": 5,"
                + "\"MaximumSO2\": 8,"
                + "\"MinimumCO\": 0.3,"
                + "\"AverageCO\": 0.5,"
                + "\"MaximumCO\": 0.7,"
                + "\"MinimumCO2\": 280,"
                + "\"AverageCO2\": 300,"
                + "\"MaximumCO2\": 350,"
                + "\"MinimumRain\": 50,"
                + "\"AverageRain\": 120,"
                + "\"MaximumRain\": 200,"
                + "\"MinimumWaterLevel\": 2.0,"
                + "\"AverageWaterLevel\": 3.0,"
                + "\"MaximumWaterLevel\": 5.0,"
                + "\"MinimumTrafficVolume\": 3000,"
                + "\"AverageTrafficVolume\": 5000,"
                + "\"MaximumTrafficVolume\": 10000,"
                + "\"SpeedLimit\": 60,"
                + "\"No_of_Maintenance\": 3,"
                + "\"No_Of_Vehicle_Passed\": 500000,"
                + "\"AverageTimeGapInMaintenance\": 1.5,"
                + "\"Crack_Surface_Area\": 50.0"
                + "}";

        InetAddress localhost = InetAddress.getLocalHost();
        String serverAddress = localhost.getHostAddress();
        System.out.println(serverAddress);
        int serverPort = 12345;

        DatagramSocket socket = new DatagramSocket();
        byte[] buffer = message.getBytes();
        InetAddress address = InetAddress.getByName("192.168.137.1");
        DatagramPacket packet = new DatagramPacket(buffer, buffer.length, address, serverPort);
        socket.send(packet);
        System.out.println("Message sent to Python UDP server: " + message);

        byte[] responseBuffer = new byte[1024];
        DatagramPacket responsePacket = new DatagramPacket(responseBuffer, responseBuffer.length);
        socket.receive(responsePacket);
        String result = new String(responsePacket.getData(), 0, responsePacket.getLength());

        System.out.println("Received processed message: " + result);

        String confirmation = "ACK";
        byte[] confirmationBuffer = confirmation.getBytes();
        DatagramPacket confirmationPacket = new DatagramPacket(
                confirmationBuffer, confirmationBuffer.length, address, serverPort);
        socket.send(confirmationPacket);
        System.out.println("Confirmation sent to server.");
        socket.close();

        result = result.replace("False", "false");
        result = result.replace("'", "\"");
        System.out.println("............................" + result);
    }
}
