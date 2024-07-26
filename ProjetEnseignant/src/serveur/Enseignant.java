package serveur;

public class Enseignant {
    private String matricule;
    private String nom;
    private String prenom;
    private String grade;
    private String departement;

    public Enseignant() {}

    public Enseignant(String matricule, String nom, String prenom, String grade, String departement) {
        this.matricule = matricule;
        this.nom = nom;
        this.prenom = prenom;
        this.grade = grade;
        this.departement = departement;
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

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getDepartement() {
        return departement;
    }

    public void setDepartement(String departement) {
        this.departement = departement;
    }
}
