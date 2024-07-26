<?php

// Classe représentant un étudiant
class Etudiant
{
    public $matricule;
    public $nom;
    public $prenom;
    public $filiere;
}

// Récupération des données du formulaire
$operation = isset($_POST["operation"]) ? htmlspecialchars($_POST["operation"]) : "";
$matricule = isset($_POST["matricule"]) ? htmlspecialchars($_POST["matricule"]) : "";
$nom = isset($_POST["nom"]) ? htmlspecialchars($_POST["nom"]) : "";
$prenom = isset($_POST["prenom"]) ? htmlspecialchars($_POST["prenom"]) : "";
$filiere = isset($_POST["filiere"]) ? htmlspecialchars($_POST["filiere"]) : "";

// Création d'une instance de la classe Etudiant
$etudiant = new Etudiant();
$etudiant->matricule = $matricule;
$etudiant->nom = $nom;
$etudiant->prenom = $prenom;
$etudiant->filiere = $filiere;

try {
    $client = new SoapClient("http://127.0.0.1:8081/Etudiant_Service?wsdl", array('cache_wsdl' => WSDL_CACHE_NONE));

    if ($operation == "ajouter") {
        $return = $client->ajouter_Etudiant($etudiant);
        echo json_encode(['success' => true, 'data' => $return]);

    } else if ($operation == "lister") {
        $return = $client->lister_Etudiant();
        $result = [];
        foreach ($return as $etudiants) {
            $taille = count($etudiants);
            if ($taille == 1) {
                $result[] = $etudiants;
            } else {
                foreach ($etudiants as $etudiant) {
                    $result[] = $etudiant;
                }
            }
        }
        echo json_encode($result);

    } else if ($operation == "modifier") {
        $return = $client->modifier_Etudiant($etudiant);
        echo json_encode(['success' => true, 'data' => $return]);

    } else if ($operation == "supprimer") {
        $return = $client->supprimer_Etudiant(['matricule'=>$matricule]);
        echo json_encode(['success' => $return]);

    } else {
        echo json_encode(['success' => false, 'message' => 'Opération non valide']);
    }

} catch (SoapFault $sf) {
    echo json_encode(['success' => false, 'message' => $sf->getMessage()]);
}
?>
