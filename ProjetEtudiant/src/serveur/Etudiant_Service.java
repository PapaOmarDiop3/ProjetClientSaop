package serveur;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

@WebService(serviceName="Etudiant_Service")
public class Etudiant_Service {

    private static final List<Etudiant> etudiants = new ArrayList<>();

    @WebMethod
    public Etudiant ajouter_Etudiant(
            @WebParam(name="matricule") String matricule,
            @WebParam(name="nom") String nom,
            @WebParam(name="prenom") String prenom,
            @WebParam(name="filiere") String filiere) { // Fermeture de la parenthèse ajoutée ici
        Etudiant etudiant = new Etudiant(matricule, nom, prenom, filiere);
        etudiants.add(etudiant);
        return etudiant;
    }

    @WebMethod
    public List<Etudiant> lister_Etudiant() {
        return etudiants;
    }

    @WebMethod
    public Etudiant rechercher_Etudiant(
            @WebParam(name="matricule") String matricule) {
        for (Etudiant e : etudiants) {
            if (e.getMatricule().equals(matricule)) {
                return e;
            }
        }
        return null;
    }

    @WebMethod
    public Etudiant modifier_Etudiant(
            @WebParam(name="matricule") String matricule,
            @WebParam(name="nom") String nom,
            @WebParam(name="prenom") String prenom,
            @WebParam(name="filiere") String filiere) { // Fermeture de la parenthèse ajoutée ici
        for (Etudiant e : etudiants) {
            if (e.getMatricule().equals(matricule)) {
                e.setNom(nom);
                e.setPrenom(prenom);
                e.setFiliere(filiere);
                return e;
            }
        }
        return null;
    }

    @WebMethod
    public String supprimer_Etudiant(
            @WebParam(name="matricule") String matricule) {
        Iterator<Etudiant> iterator = etudiants.iterator();
        while (iterator.hasNext()) {
            Etudiant e = iterator.next();
            if (e.getMatricule().equals(matricule)) {
                iterator.remove();
                return matricule;
            }
        }
        return "Etudiant non trouvé";
    }
}
