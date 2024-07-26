package serveur;

import javax.xml.ws.Endpoint;

public class Enseignant_Serveur {

    public static void main(String[] args) {
        String url = "http://127.0.0.1:8082/Enseignant_Service";
        Endpoint.publish(url, new Enseignant_Service());
        System.out.println("Webserver started at address " + url);
    }
}
