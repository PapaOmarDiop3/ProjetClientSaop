package serveur;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

@WebService(serviceName="Enseignant_Service")
public class Enseignant_Service {

    private static final List<Enseignant> enseignants = new ArrayList<>();

    @WebMethod
    public Enseignant ajouter_Enseignant(@WebParam(name="matricule") String matricule,
                                         @WebParam(name="nom") String nom,
                                         @WebParam(name="prenom") String prenom,
                                         @WebParam(name="grade") String grade,
                                         @WebParam(name="departement") String departement) {
        Enseignant enseignant = new Enseignant(matricule, nom, prenom, grade, departement);
        enseignants.add(enseignant);
        return enseignant;
    }

    @WebMethod
    public List<Enseignant> lister_Enseignant() {
        return enseignants;
    }

    @WebMethod
    public Enseignant rechercher_Enseignant(@WebParam(name="matricule") String matricule) {
        for (Enseignant e : enseignants) {
            if (e.getMatricule().equals(matricule)) {
                return e;
            }
        }
        return null;
    }

    @WebMethod
    public Enseignant modifier_Enseignant(@WebParam(name="matricule") String matricule,
                                          @WebParam(name="nom") String nom,
                                          @WebParam(name="prenom") String prenom,
                                          @WebParam(name="grade") String grade,
                                          @WebParam(name="departement") String departement) {
        for (Enseignant e : enseignants) {
            if (e.getMatricule().equals(matricule)) {
                e.setNom(nom);
                e.setPrenom(prenom);
                e.setGrade(grade);
                e.setDepartement(departement);
                return e;
            }
        }
        return null;
    }

    @WebMethod
    public String supprimer_Enseignant(@WebParam(name="matricule") String matricule) {
        Iterator<Enseignant> iterator = enseignants.iterator();
        while (iterator.hasNext()) {
            Enseignant e = iterator.next();
            if (e.getMatricule().equals(matricule)) {
                iterator.remove();
                return matricule;
            }
        }
        return "Enseignant non trouvé";
    }
}
