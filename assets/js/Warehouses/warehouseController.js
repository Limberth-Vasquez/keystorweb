$(() => {
    $(document).ready(function () {
    });
    //START
    const _WarehouseDAO = new WarehouseDAO();
    var _isUserAuthenticated = false;
    var _isEditing = false;
    isUserAuthenticated();
    //START
    /*****************************************************************************************************/
    $(document).on("click", ".btnLogout", function (event) {
        logOut();
    });

    function logOut() {
        _WarehouseDAO.signOut().then(() => {
            window.location.replace("../keystor.html");
        });
        //window.location.replace("auth-signin.html");
    }
    /*****************************************************************************************************/
    function loadAll() {
        _WarehouseDAO.getAll().onSnapshot(querySnapshot => {
            querySnapshot.forEach(result => {
                //console.log(result.data());
                $('#tbody').empty();
                if (querySnapshot.empty) {
                    //$('#Warehouses').append(this.obtenerTemplatePostVacio())
                    printWarningAlert(' Not results found.');
                } else {
                    //printSuccessAlert(' The results loaded successfully.');
                    querySnapshot.forEach(row => {
                        let rowHtml = getRowTempate(
                            row.id,
                            row.data().name,
                            row.data().Lat,
                            row.data().Lng,
                            row.data().address,
                            row.data().imageUrl,
                            row.data().description
                        );
                        $('#tbody').append(rowHtml)
                    })

                    $('#tableComplete').DataTable();
                }
            })
        });
    }
    /*****************************************************************************************************/
    function getRowTempate(id, name, latitude, longitude, address, imageUrl, descripcion) {
        return `<tr>
                    <td>'${name}'</td>
                    <td>'${latitude}'</td>
                    <td>'${longitude}'</td>
                    <td>'${address}'</td>
                    <!--<td>'${imageUrl}'</td>-->
                    <!--<td>'${descripcion}'</td>-->
                    <td>
                        <ul class="breadcrumb" style="background: none; padding: 0px;">
                            <li class="breadcrumb-item"><a href="#" class="feather icon-edit-2 btnEditRow" title="Edit" data-id="${id}"></a></li>
                            <li class="breadcrumb-item"><a href="#" class="feather icon-trash-2 btnDeleteRow" title="Delete" data-id="${id}" data-name="${name}" data-toggle="modal" data-target="#confirm-delete"></a></li>
                        </ul>
                    </td>
                </tr>`;
    }
    /*****************************************************************************************************/
    function isUserAuthenticated() {
        _WarehouseDAO.loadUserLogin(function (user) {
            if (user) {
                // User is signed in.
                if (user.photoURL != null && user.displayName != null) {
                    document.getElementById("userLoginName").innerHTML = user.photoURL + ' ' + user.displayName;
                    document.getElementById("userLoginName2").innerHTML = user.photoURL + ' ' + user.displayName;
                } else {
                    document.getElementById("userLoginName").innerHTML = '<img src="../assets/images/ic_launcher-web.png" class="circle mr-3 image-responsive" width="55px" height="55px" > ' + user.displayName;
                    document.getElementById("userLoginName2").innerHTML = '<img src="../assets/images/ic_launcher-web.png" class="img-radius" alt="User-Profile-Image"> ' + user.displayName;
                }
                _isUserAuthenticated = true;

                loadAll();
            } else {
                // No user is signed in.
                _isUserAuthenticated = false;
                printWarningAlert(' To create the Warehouse you must be authenticated.');
                document.getElementById("closeModal").click();
                logOut();
                window.location.replace("../auth-signin.html");
            }
            console.log(user);
        });

        /*const user = firebase.auth().currentUser;
        if (user == null) {
            printWarningAlert(' To create the Warehouse you must be authenticated.');
            document.getElementById("closeModal").click();
            return false;
        } else {
            return true;
        }*/
    }
    /*****************************************************************************************************/
    function invalidInputForm() {
        if ($('#description').val() == '') {
            return true;
        }
        if ($('#name').val() == '') {
            return true;
        }
        if ($('#Latitud').val() == '') {
            return true;
        }
        if ($('#Longitud').val() == '') {
            return true;
        }
        if ($('#Address').val() == '') {
            return true;
        }
        if ($('#imgUrl').val() == '') {
            return true;
        }
        return false;
    }
    /*****************************************************************************************************/
    $("#btnConfirmSave").click(() => {
        if (_isUserAuthenticated) {
            if (!invalidInputForm()) {
                var warehouse = new Warehouse();
                warehouse.description = $('#description').val();
                warehouse.name = $('#name').val();
                warehouse.Lat = $('#Latitud').val();
                warehouse.Lng = $('#Longitud').val();
                warehouse.address = $('#Address').val();
                warehouse.imageUrl = $('#imgUrl').val();

                _WarehouseDAO.create(warehouse).then(result => {
                    printSuccessAlert(' Warehouse created successfully.');
                    document.getElementById("closeModal").click();
                    console.log(`Id of warehouse => ${result.id}`);
                }).catch(err => {
                    printDangerAlert('Error creating document: ' + err.message);
                    console.log('Error creating document: ', err.message);
                });
            } else {
                printWarningAlert(' You must complete the required fields.');
            }
        }
    });
    /*****************************************************************************************************/
    $('#btnOpenModal').click(() => {
        $("#FormId").trigger('reset');
        $("#CreateModalLabel").css("display", "block");
        $("#EditModalLabel").css("display", "none");
        $("#btnConfirmSave").css("display", "block");
        $("#btnConfirmEdit").css("display", "none");
    });
    /*****************************************************************************************************/
    $(document).on("click", ".btnEditRow", function (event) {
        if (_isUserAuthenticated) {
            var id = $(this).data("id");
            if (id) {
                _WarehouseDAO.getById(id).then(result => {
                    var doc = result.data();
                    console.log(doc);

                    $('#btnConfirmEdit').attr('data-id', id);
                    $('#btnConfirmEdit').data("id", id);
                    //console.log($('#btnConfirmEdit').data("id"));

                    $('#btnOpenModal').click();
                    $('#description').val(doc.description);
                    $('#name').val(doc.name);
                    $('#Latitud').val(doc.Lat);
                    $('#Longitud').val(doc.Lng);
                    $('#Address').val(doc.address);
                    $('#imgUrl').val(doc.imageUrl);
                    //printSuccessAlert('Document retrieved successfully!');
                    $("#CreateModalLabel").css("display", "none");
                    $("#EditModalLabel").css("display", "block");
                    $("#btnConfirmSave").css("display", "none");
                    $("#btnConfirmEdit").css("display", "block");

                }).catch(err => {
                    printDangerAlert('Error retrieving document: ' + err.message);
                    document.getElementById("closeModal").click();
                    console.log('Error retrieving document: ', err.message);
                });
            } else {
                printDangerAlert('Error retrieving document: ID is not defined.');
                document.getElementById("closeModal").click();
            }
        }
    });

    /*****************************************************************************************************/
    $("#btnConfirmEdit").click(() => {
        if (_isUserAuthenticated) {
            var id = $('#btnConfirmEdit').data("id");
            if (id) {

                var warehouse = new Warehouse();
                warehouse.id = id;
                warehouse.description = $('#description').val();
                warehouse.name = $('#name').val();
                warehouse.Lat = $('#Latitud').val();
                warehouse.Lng = $('#Longitud').val();
                warehouse.address = $('#Address').val();
                warehouse.imageUrl = $('#imgUrl').val();

                _WarehouseDAO.update(warehouse).then(result => {
                    printSuccessAlert('Document updated successfully!');
                    console.log('Document updated successfully!', result);
                }).catch(error => {
                    printDangerAlert('Error updating document: ' + error.message);
                    console.error('Error updating document: ', error);
                });
            } else {
                printDangerAlert('Error updating document: ID is not defined.');
            }
            document.getElementById("closeModal").click();
        }
    });
    /*****************************************************************************************************/
    $(document).on("click", ".btnDeleteRow", function (event) {
        if (_isUserAuthenticated) {
            var id = $(this).data("id");
            var name = $(this).data("name");
            $('#btnConfirmDelete').attr('data-id', id);
            $('.debug-url').html('Delete: <strong><span>' + name + '</span>?</strong>');
        }
    });
    /*****************************************************************************************************/
    $("#btnConfirmDelete").click(() => {
        if (_isUserAuthenticated) {
            var id = $('#btnConfirmDelete').data("id");
            if (id) {
                _WarehouseDAO.delete(id).then(result => {
                    printSuccessAlert('Document successfully deleted!');
                    console.log('Document successfully deleted! ', result);
                }).catch(error => {
                    printDangerAlert('Error removing document: ' + error.message);
                    console.error('Error removing document: ', error);
                });
            } else {
                printDangerAlert('Error removing document: ID is not defined.');
            };
            document.getElementById("btnCloseDeleteModal").click();
        }
    });
    /*****************************************************************************************************/
    //$('#confirm-delete').on('show.bs.modal', function(e) {
    //$(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

    //$('.debug-url').html('Delete URL: <strong>' + $(this).find('.btn-ok').attr('href') + '</strong>');
    //});
});