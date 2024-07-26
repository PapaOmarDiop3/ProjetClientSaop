
package serveur;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Etudiant {
    
    private String matricule;
    private String nom;
    private String prenom;
    private String filiere;
    
    public Etudiant() {        
    }    
    
    public Etudiant(String matricule, String nom, String prenom, String filiere) {
        this.matricule = matricule;
        this.nom = nom;
        this.prenom = prenom;
        this.filiere = filiere;
    }
    
    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
    
    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getFiliere() {
        return filiere;
    }

    public void setFiliere(String filiere) {
        this.filiere = filiere;
    }
}

