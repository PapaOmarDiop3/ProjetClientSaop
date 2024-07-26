$(document).ready(function() {
    // Fonction pour lister les étudiants
    function listerEtudiants() {
        $.ajax({
            url: 'ajax/Etudiant_Service.php',
            method: 'POST',
            data: {
                operation: "lister"
            },
            success: function(data) {
                console.log('Liste des étudiants reçue :', data); // Debug: Afficher la réponse du serveur
                try {
                    var etudiants = JSON.parse(data);
                    $('#table_Etudiant tbody').empty();
                    etudiants.forEach(function(etudiant) {
                        var ligne = "<tr id='ligne" + etudiant.matricule + "'>" +
                            "<td>" + etudiant.matricule + "</td>" +
                            "<td>" + etudiant.nom + "</td>" +
                            "<td>" + etudiant.prenom + "</td>" +
                            "<td>" + etudiant.filiere + "</td>" +
                            "<td>" +
                            "<button type='button' class='btn btn-info btn-modifier' data-matricule='" + etudiant.matricule + "'>Modifier</button> " +
                            "<button type='button' class='btn btn-danger btn-supprimer' data-matricule='" + etudiant.matricule + "'>Supprimer</button>" +
                            "</td>" +
                            "</tr>";
                        $('#table_Etudiant tbody').append(ligne);
                    });
                    attacherEvenements();
                } catch (e) {
                    console.error('Erreur lors de l\'analyse des données :', e);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Erreur lors de la récupération des étudiants :', textStatus, errorThrown);
            }
        });
    }

    // Fonction pour attacher les événements aux boutons
    function attacherEvenements() {
        $('.btn-modifier').off('click').on('click', function() {
            var matricule = $(this).data('matricule');
            modifier_Etudiant(matricule);
        });

        $('.btn-supprimer').off('click').on('click', function() {
            var matricule = $(this).data('matricule');
            supprimer_Etudiant(matricule);
        });
    }

    // Fonction pour afficher le modal de modification d'un étudiant
    function modifier_Etudiant(matricule) {
        var ligne = $('#ligne' + matricule);
        $('#inpt_mod_Matricule').val(matricule);
        $('#inpt_mod_Nom').val(ligne.find('td:eq(1)').text());
        $('#inpt_mod_Prenom').val(ligne.find('td:eq(2)').text());
        $('#inpt_mod_Filiere').val(ligne.find('td:eq(3)').text());
        $('#modifier_Etudiant').modal('show');
    }

    // Fonction pour supprimer un étudiant
    function supprimer_Etudiant(matricule) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
            $.ajax({
                url: 'ajax/Etudiant_Service.php',
                method: 'POST',
                data: {
                    operation: 'supprimer',
                    matricule: matricule
                },
                success: function(data) {
                    console.log('Réponse de la suppression :', data); // Debug: Afficher la réponse du serveur
                    try {
                        var response = JSON.parse(data);
                        if (response.success) {
                            $('#ligne' + matricule).remove(); // Suppression visuelle immédiate
                            listerEtudiants(); // Rafraîchir la liste pour garantir la mise à jour
                        } else {
                            alert('Erreur lors de la suppression de l\'étudiant');
                        }
                    } catch (e) {
                        console.error('Erreur lors de l\'analyse de la réponse JSON :', e);
                        alert('Erreur de réponse du serveur');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Erreur lors de la suppression :', textStatus, errorThrown);
                    alert('La requête n\'a pas abouti');
                }
            });
        }
    }

    // Fonction pour ajouter un étudiant
    $('#btn_ajouter_Etudiant').click(function() {
        var matricule = $('#inpt_ajt_Matricule').val();
        var nom = $('#inpt_ajt_Nom').val();
        var prenom = $('#inpt_ajt_Prenom').val();
        var filiere = $('#inpt_ajt_Filiere').val();

        $.ajax({
            url: 'ajax/Etudiant_Service.php',
            method: 'POST',
            data: {
                operation: 'ajouter',
                matricule: matricule,
                nom: nom,
                prenom: prenom,
                filiere: filiere
            },
            success: function(data) {
                console.log('Réponse de l\'ajout :', data); // Debug: Afficher la réponse du serveur
                listerEtudiants();
                $('#ajouter_Etudiant').modal('hide');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Erreur lors de l\'ajout :', textStatus, errorThrown);
                alert('La requête n\'a pas abouti');
            }
        });
    });

    // Fonction pour modifier un étudiant
    $('#btn_modifier_Etudiant').click(function() {
        var matricule = $('#inpt_mod_Matricule').val();
        var nom = $('#inpt_mod_Nom').val();
        var prenom = $('#inpt_mod_Prenom').val();
        var filiere = $('#inpt_mod_Filiere').val();

        $.ajax({
            url: 'ajax/Etudiant_Service.php',
            method: 'POST',
            data: {
                operation: 'modifier',
                matricule: matricule,
                nom: nom,
                prenom: prenom,
                filiere: filiere
            },
            success: function(data) {
                console.log('Réponse de la modification :', data); // Debug: Afficher la réponse du serveur
                listerEtudiants();
                $('#modifier_Etudiant').modal('hide');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Erreur lors de la modification :', textStatus, errorThrown);
                alert('La requête n\'a pas abouti');
            }
        });
    });

    // Initialisation : liste des étudiants
    listerEtudiants();
});
