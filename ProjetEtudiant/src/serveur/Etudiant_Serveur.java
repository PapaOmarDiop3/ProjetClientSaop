package serveur;

import javax.xml.ws.Endpoint;

public class Etudiant_Serveur {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        String url="http://127.0.0.1:8081/";
        Endpoint.publish(url, new Etudiant_Service());
        System.out.println("Webserver started at address http://127.0.0.1:8081");
	}

}