$(() => {
    $(document).ready(function () {
    });
    //START
    const _RoleDAO = new RolesDAO();
    var _isUserAuthenticated = false;
    var _isEditing = false;
    isUserAuthenticated();
    //START
    /*****************************************************************************************************/
    $(document).on("click", ".btnLogout", function (event) {
        logOut();
    });

    function logOut() {
        _RoleDAO.signOut().then(() => {
            window.location.replace("../index.html");
        });
        //window.location.replace("auth-signin.html");
    }
    /*****************************************************************************************************/
    function loadAll() {
        _RoleDAO.getAll().onSnapshot(querySnapshot => {
            if (querySnapshot.empty) {
                printWarningAlert(' Not results found.');
                $('#tbody').empty();
            } else {
                querySnapshot.forEach(result => {
                    //console.log(result.data());
                    $('#tbody').empty();
                    querySnapshot.forEach(row => {
                        //console.log(row);
                        let rowHtml = getRowTempate(
                            row.id,
                            row.data().name,
                            row.data().active,
                        );
                        $('#tbody').append(rowHtml)
                    })
                    $('#tableComplete').DataTable();
                })
            }
        });
    }
    /*****************************************************************************************************/
    function getRowTempate(id, name, active) {
        return `<tr>
                    <td>'${name}'</td>
                    <td>'${active}'</td>
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
        _RoleDAO.loadUserLogin(function (user) {
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
                printWarningAlert(' To create the document you must be authenticated.');
                document.getElementById("closeModal").click();
                logOut();
                window.location.replace("../auth-signin.html");
            }
            console.log(user);
        });
    }
    /*****************************************************************************************************/
    function invalidInputForm() {
        /*if ($('#active').val() == '') {
            return true;
        }*/
        if ($('#name').val() == '') {
            return true;
        }
        return false;
    }
    /*****************************************************************************************************/
    $("#btnConfirmSave").click(() => {
        if (_isUserAuthenticated) {
            if (!invalidInputForm()) {
                var obj = new Rol();
                obj.description = $('#description').val();
                obj.name = $('#name').val();
                obj.active = $('#active').val();

                _RoleDAO.create(obj).then(result => {
                    printSuccessAlert(' Document created successfully.');
                    document.getElementById("closeModal").click();
                    console.log(`Id of rol => ${result.id}`);
                }).catch(err => {
                    printDangerAlert('Error creating document: ' + err.message);
                    console.log('Error creating document: ', err.message);
                });
            } else {
                printWarningAlert(' You must complete the required fields.');
                document.getElementById("closeModal").click();
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
                _RoleDAO.getById(id).then(result => {
                    var doc = result.data();
                    console.log(doc);

                    $('#btnConfirmEdit').attr('data-id', id);
                    $('#btnConfirmEdit').data("id", id);
                    // console.log($('#btnConfirmEdit').data("id"));
                    // console.log(id);

                    $('#btnOpenModal').click();
                    $('#name').val(doc.name);
                    $('#active').val(doc.active.toString());

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

                var obj = new Rol();
                obj.id = id;
                obj.name = $('#name').val();

                var isTrueSet = ($('#active').val() === 'true');
                obj.active = isTrueSet;
                //obj.active = $('#active').val();

                _RoleDAO.update(obj).then(result => {
                    printSuccessAlert('Document updated successfully!');
                    console.log('Document updated successfully!', id);
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
                //_RoleDAO.delete(id).then(result => {
                _RoleDAO.deactivate(id).then(result => {
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
});