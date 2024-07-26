$(document).ready(function() {
    // Fonction pour lister les enseignants
    function listerEnseignants() {
        $.ajax({
            url: 'ajax/Enseignant_Service.php',
            method: 'POST',
            data: { operation: "lister" },
            success: function(data) {
                console.log('Liste des enseignants reçue :', data);
                try {
                    var enseignants = JSON.parse(data);
                    $('#table_Enseignant tbody').empty();
                    enseignants.forEach(function(enseignant) {
                        var ligne = "<tr id='ligne" + enseignant.matricule + "'>" +
                            "<td>" + enseignant.matricule + "</td>" +
                            "<td>" + enseignant.nom + "</td>" +
                            "<td>" + enseignant.prenom + "</td>" +
                            "<td>" + enseignant.grade + "</td>" +
                            "<td>" + enseignant.departement + "</td>" +
                            "<td>" +
                            "<button type='button' class='btn btn-info btn-modifier' data-matricule='" + enseignant.matricule + "'>Modifier</button> " +
                            "<button type='button' class='btn btn-danger btn-supprimer' data-matricule='" + enseignant.matricule + "'>Supprimer</button>" +
                            "</td>" +
                            "</tr>";
                        $('#table_Enseignant tbody').append(ligne);
                    });
                    attacherEvenements();
                } catch (e) {
                    console.error('Erreur lors de l\'analyse des données :', e);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Erreur lors de la récupération des enseignants :', textStatus, errorThrown);
                console.log('Réponse du serveur :', jqXHR.responseText);
                alert('Erreur lors de la récupération des enseignants : ' + errorThrown);
            }
        });
    }

    // Fonction pour ajouter un enseignant
    function ajouterEnseignant() {
        var matricule = $('#inpt_ajt_Matricule').val();
        var nom = $('#inpt_ajt_Nom').val();
        var prenom = $('#inpt_ajt_Prenom').val();
        var grade = $('#inpt_ajt_Grade').val();
        var departement = $('#inpt_ajt_Departement').val();

        if (matricule && nom && prenom && grade && departement) {
            $.ajax({
                url: 'ajax/Enseignant_Service.php',
                method: 'POST',
                data: {
                    operation: 'ajouter',
                    matricule: matricule,
                    nom: nom,
                    prenom: prenom,
                    grade: grade,
                    departement: departement
                },
                success: function(data) {
                    console.log('Réponse de l\'ajout :', data);
                    try {
                        var response = JSON.parse(data);
                        if (response.success) {
                            listerEnseignants();
                            $('#ajouter_Enseignant').modal('hide');
                            // Réinitialiser les champs
                            $('#inpt_ajt_Matricule').val('');
                            $('#inpt_ajt_Nom').val('');
                            $('#inpt_ajt_Prenom').val('');
                            $('#inpt_ajt_Grade').val('');
                            $('#inpt_ajt_Departement').val('');
                        } else {
                            alert('Erreur lors de l\'ajout de l\'enseignant : ' + response.message);
                        }
                    } catch (e) {
                        console.error('Erreur lors de l\'analyse de la réponse JSON :', e);
                        console.log('Réponse du serveur :', data);
                        alert('Erreur de réponse du serveur');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Erreur lors de l\'ajout :', textStatus, errorThrown);
                    console.log('Réponse du serveur :', jqXHR.responseText);
                    alert('Erreur lors de l\'ajout : ' + errorThrown);
                }
            });
        } else {
            alert('Veuillez remplir tous les champs');
        }
    }

    // Fonction pour modifier un enseignant
    function modifierEnseignant(matricule) {
        // Récupérer les valeurs des champs
        var nom = $('#inpt_mod_Nom').val();
        var prenom = $('#inpt_mod_Prenom').val();
        var grade = $('#inpt_mod_Grade').val();
        var departement = $('#inpt_mod_Departement').val();

        if (nom && prenom && grade && departement) {
            $.ajax({
                url: 'ajax/Enseignant_Service.php',
                method: 'POST',
                data: {
                    operation: 'modifier',
                    matricule: matricule,
                    nom: nom,
                    prenom: prenom,
                    grade: grade,
                    departement: departement
                },
                success: function(data) {
                    console.log('Réponse de la modification :', data);
                    try {
                        var response = JSON.parse(data);
                        if (response.success) {
                            listerEnseignants();
                            $('#modifier_Enseignant').modal('hide');
                        } else {
                            alert('Erreur lors de la modification de l\'enseignant : ' + response.message);
                        }
                    } catch (e) {
                        console.error('Erreur lors de l\'analyse de la réponse JSON :', e);
                        console.log('Réponse du serveur :', data);
                        alert('Erreur de réponse du serveur');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Erreur lors de la modification :', textStatus, errorThrown);
                    console.log('Réponse du serveur :', jqXHR.responseText);
                    alert('Erreur lors de la modification : ' + errorThrown);
                }
            });
        } else {
            alert('Veuillez remplir tous les champs');
        }
    }

    // Fonction pour supprimer un enseignant
    function supprimerEnseignant(matricule) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?")) {
            $.ajax({
                url: 'ajax/Enseignant_Service.php',
                method: 'POST',
                data: {
                    operation: 'supprimer',
                    matricule: matricule
                },
                success: function(data) {
                    console.log('Réponse de la suppression :', data);
                    try {
                        var response = JSON.parse(data);
                        if (response.success) {
                            // Supprimer la ligne correspondante du tableau
                            $('#ligne' + matricule).remove();
                            alert('Enseignant supprimé avec succès');
                        } else {
                            alert('Erreur lors de la suppression de l\'enseignant : ' + response.message);
                        }
                    } catch (e) {
                        console.error('Erreur lors de l\'analyse de la réponse JSON :', e);
                        console.log('Réponse du serveur :', data);
                        alert('Erreur de réponse du serveur');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Erreur lors de la suppression :', textStatus, errorThrown);
                    console.log('Réponse du serveur :', jqXHR.responseText);
                    alert('Erreur lors de la suppression : ' + errorThrown);
                }
            });
        }
    }

    // Attacher les événements pour les boutons Modifier et Supprimer
    function attacherEvenements() {
        $('.btn-modifier').off('click').on('click', function() {
            var matricule = $(this).data('matricule');
            // Remplir les champs du modal de modification
            $('#inpt_mod_Matricule').val(matricule);
            $('#inpt_mod_Nom').val($(this).closest('tr').find('td:nth-child(2)').text());
            $('#inpt_mod_Prenom').val($(this).closest('tr').find('td:nth-child(3)').text());
            $('#inpt_mod_Grade').val($(this).closest('tr').find('td:nth-child(4)').text());
            $('#inpt_mod_Departement').val($(this).closest('tr').find('td:nth-child(5)').text());

            // Événement pour le bouton de confirmation de modification
            $('#btn_modifier_Enseignant').off('click').on('click', function() {
                modifierEnseignant(matricule);
            });

            $('#modifier_Enseignant').modal('show');
        });

        $('.btn-supprimer').off('click').on('click', function() {
            var matricule = $(this).data('matricule');
            supprimerEnseignant(matricule);
        });
    }

    // Événement pour le bouton d'ajout
    $('#btn_ajouter_Enseignant').click(function() {
        ajouterEnseignant();
    });

    // Initialisation : liste des enseignants
    listerEnseignants();
});
