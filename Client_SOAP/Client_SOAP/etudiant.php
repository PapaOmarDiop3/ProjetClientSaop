<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/buttons.dataTables.min.css"/>
    <link rel="stylesheet" href="css/jquery.dataTables.min.css"/>
    <script src="js/jquery-3.7.0.js"></script>
    <script src="js/bootstrap.js"></script>
    <title>Title</title>
</head>
<body>

<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
                <li><a href="index.php">Accueil</a></li>
                <li class="active"><a href="#">Etudiants</a></li>
                <li><a href="enseignant.php">Enseignants</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="container">
    <br/>
    <h3 style="text-align: center">La liste des Etudiants</h3>
    <div class="row" style="padding-bottom: 10px; padding-top: 10px">
        <div style="text-align: center">
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#ajouter_Etudiant">Ajouter</button>
        </div>
    </div>

    <!-- Modal Ajouter Etudiant -->
    <div id="ajouter_Etudiant" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Ajouter Etudiant</h4>
                </div>
                <form class="form">
                    <div class="modal-body" style="padding:30px 30px;">
                        <div class="row">
                            <label for="inpt_ajt_Matricule">Matricule</label>
                            <input type="text" class="inputbasic form-control" id="inpt_ajt_Matricule"/>
                        </div>
                        <div class="row">
                            <label for="inpt_ajt_Nom">Nom</label>
                            <input type="text" class="inputbasic form-control" id="inpt_ajt_Nom"/>
                        </div>
                        <div class="row">
                            <label for="inpt_ajt_Prenom">Prenom</label>
                            <input type="text" class="inputbasic form-control" id="inpt_ajt_Prenom"/>
                        </div>
                        <div class="row">
                            <label for="inpt_ajt_Filiere">Filiere</label>
                            <input type="text" class="inputbasic form-control" id="inpt_ajt_Filiere"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-6">
                            <button type="button" id="btn_ajouter_Etudiant" class="btn btn-primary pull-left"><span class="mot_Entregistrer">Ajouter</span></button>
                        </div>
                        <div class="col-sm-6">
                            <button type="button" class="btn btn-default" data-dismiss="modal"><span class="mot_Fermer">Annuler</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal Modifier Etudiant -->
    <div class="modal fade" id="modifier_Etudiant" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modifier un étudiant</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="inpt_mod_Matricule">Matricule</label>
                            <input type="text" class="form-control" id="inpt_mod_Matricule" readonly>
                        </div>
                        <div class="form-group">
                            <label for="inpt_mod_Nom">Nom</label>
                            <input type="text" class="form-control" id="inpt_mod_Nom">
                        </div>
                        <div class="form-group">
                            <label for="inpt_mod_Prenom">Prénom</label>
                            <input type="text" class="form-control" id="inpt_mod_Prenom">
                        </div>
                        <div class="form-group">
                            <label for="inpt_mod_Filiere">Filière</label>
                            <input type="text" class="form-control" id="inpt_mod_Filiere">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-primary" id="btn_modifier_Etudiant">Modifier</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Tableau des étudiants -->
    <div class="table-responsive">
        <table class="table table-bordered table-striped" id="table_Etudiant">
            <thead>
            <tr>
                <th>Matricule</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Filière</th>
                <th>Opérations</th>
            </tr>
            </thead>
            <tbody>
            <!-- Les étudiants seront ajoutés ici dynamiquement -->
            </tbody>
        </table>
    </div>
</div>

<script src="js/etudiant.js"></script>

</body>
</html>
