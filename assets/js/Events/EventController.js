$(() => {
    $(document).ready(function () {
    });
    //START
    const _dao = new EventDAO();
    var _isUserAuthenticated = false;
    var _isEditing = false;
    isUserAuthenticated();
    //START
    /*****************************************************************************************************/
    $(document).on("click", ".btnLogout", function (event) {
        logOut();
    });

    function logOut(){
        _dao.signOut().then(() => {
            window.location.replace("../keystor.html");
        });
        //window.location.replace("auth-signin.html");
    }
    /*****************************************************************************************************/
    function loadAll() {
        _dao.getAll().onSnapshot(querySnapshot => {
            if (querySnapshot.empty) {
                printWarningAlert(' Not results found.');
            }
            else {
                querySnapshot.forEach(result => {
                    $('#tbody').empty();
                    querySnapshot.forEach(row => {
                        let rowHtml = getRowTempate(
                            row.id,
                            row.data().name,
                            row.data().email,
                            row.data().phone,
                            row.data().Lat,
                            row.data().Lng,
                            row.data().address,
                            row.data().imageUrl,
                            row.data().description,
                            row.data().fees1,
                            row.data().fees2,
                            row.data().fees3,
                            row.data().active
                        );
                        $('#tbody').append(rowHtml)
                    })

                    $('#tableComplete').DataTable();

                })
            }
        });
    }
    /*****************************************************************************************************/
    function getRowTempate(id, name, email, phone, latitude, longitude, address, imageUrl, descripcion, fees1, fees2, fees3,active) {
        return `<tr>
                    <td>'${name}'</td>
                    <td>'${email}'</td>
                    <td>'${phone}'</td>
                    <td>'${latitude}'</td>
                    <td>'${longitude}'</td>
                    <td>'${address}'</td>
                    <td>'${fees1}'</td>
                    <td>'${fees2}'</td>
                    <td>'${fees3}'</td>
                    <td>'${active}'</td>
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
        _dao.loadUserLogin(function (user) {
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
                printWarningAlert(' To create you must be authenticated.');
                document.getElementById("closeModal").click();
                logOut();
            }
            console.log(user);
        });
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
                var obj = new Event();
                obj.description = $('#description').val();
                obj.name = $('#name').val();
                obj.Lat = $('#Latitud').val();
                obj.Lng = $('#Longitud').val();
                obj.address = $('#Address').val();
                obj.imageUrl = $('#imgUrl').val();

                obj.email = $('#email').val();
                obj.phone = $('#phone').val();
                obj.fees1 = $('#fees1').val();
                obj.fees2 = $('#fees2').val();
                obj.fees3 = $('#fees3').val();

                _dao.create(obj).then(result => {
                    printSuccessAlert(' Document created successfully.');
                    document.getElementById("closeModal").click();
                    console.log(`Id of obj => ${result.id}`);
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
        $("#FormId2").trigger('reset');
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
                _dao.getById(id).then(result => {
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



                    $('#email').val(doc.email);
                    $('#phone').val(doc.phone);
                    $('#fees1').val(doc.fees1);
                    $('#fees2').val(doc.fees2);
                    $('#fees3').val(doc.fees3);
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

                var obj = new Event();
                obj.id = id;
                obj.description = $('#description').val();
                obj.name = $('#name').val();
                obj.Lat = $('#Latitud').val();
                obj.Lng = $('#Longitud').val();
                obj.address = $('#Address').val();
                obj.imageUrl = $('#imgUrl').val();


                obj.email = $('#email').val();
                obj.phone = $('#phone').val();
                obj.fees1 = $('#fees1').val();
                obj.fees2 = $('#fees2').val();
                obj.fees3 = $('#fees3').val();

                var isTrueSet = ($('#active').val() === 'true');
                obj.active = isTrueSet;

                _dao.update(obj).then(result => {
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
                _dao.delete(id).then(result => {
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