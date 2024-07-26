<?php
// model
class Enseignant
{
    public $matricule;
    public $nom;
    public $prenom;
    public $grade;
    public $departement;
}

$operation = @htmlspecialchars($_POST["operation"]);
$matricule = @htmlspecialchars($_POST["matricule"]);
$nom = @htmlspecialchars($_POST["nom"]);
$prenom = @htmlspecialchars($_POST["prenom"]);
$grade = @htmlspecialchars($_POST["grade"]);
$departement = @htmlspecialchars($_POST["departement"]);

// create instance
$enseignant = new Enseignant();
$enseignant->matricule = $matricule;
$enseignant->nom = $nom;
$enseignant->prenom = $prenom;
$enseignant->grade = $grade;
$enseignant->departement = $departement;

try {
    $client = new SoapClient("http://127.0.0.1:8082/Enseignant_Service?wsdl", array('cache_wsdl' => WSDL_CACHE_NONE));

    if ($operation == "ajouter") {
        $return = $client->ajouter_Enseignant($enseignant);
        echo json_encode(['success' => true, 'data' => $return]);

    } else if ($operation == "lister") {
        $return = $client->lister_Enseignant();
        $result = [];
        foreach ($return as $enseignants) {
            $taille = count($enseignants);
            if ($taille == 1) {
                $result[] = $enseignants;
            } else {
                foreach ($enseignants as $enseignant) {
                    $result[] = $enseignant;
                }
            }
        }
        echo json_encode($result);

    } else if ($operation == "modifier") {
        $return = $client->modifier_Enseignant($enseignant);
        echo json_encode(['success' => true, 'data' => $return]);

    } else if ($operation == "supprimer") {
        $return = $client->supprimer_Enseignant(['matricule'=>$matricule]);
        echo json_encode(['success' => $return]);

    } else {
        echo json_encode(['success' => false, 'message' => 'Opération non valide']);
    }

} catch (SoapFault $sf) {
    echo json_encode(['success' => false, 'message' => $sf->getMessage()]);
}
?>
