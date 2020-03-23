
successAlert =
    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
    '<strong>Success!</strong> ';
dangerAlert =
    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
    '<strong>Danger!</strong> ';
warningAlert =
    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
    '<strong>Warning!</strong> ';
/*****************************************************************************************************/
function printSuccessAlert(msg) {
    document.getElementById("successAlert").innerHTML = (successAlert + msg);
    document.getElementById("successAlert").style.display = 'block';
    setTimeout(function () {
        document.getElementById("successAlert").style.display = 'none';
    }, 4000);
}
function printDangerAlert(msg) {
    document.getElementById("dangerAlert").innerHTML = (dangerAlert + msg);
    document.getElementById("dangerAlert").style.display = 'block';
    setTimeout(function () {
        document.getElementById("dangerAlert").style.display = 'none';
    }, 4000);
}
function printWarningAlert(msg) {
    document.getElementById("warningAlert").innerHTML = (warningAlert + msg);
    document.getElementById("warningAlert").style.display = 'block';
    setTimeout(function () {
        document.getElementById("warningAlert").style.display = 'none';
    }, 4000);
}
/*****************************************************************************************************/
$(document).ready(function () {
    document.getElementById("headerSection").innerHTML = `
        <div class="m-header">
            <a class="mobile-menu" id="mobile-collapse1" href="javascript:"><span></span></a>
            <a href="index.html" class="b-brand">
                   <!-- <div class="b-bg">
                       <i class="feather icon-trending-up"></i>
                   </div> -->
                   <label><img src="../assets/images/keystore_logo.png" class="image-responsive" width="125px" height="50px"></label>

                   <!-- <span class="b-title">Keystor</span> -->
               </a>
        </div>
        <a class="mobile-menu" id="mobile-header" href="javascript:">
            <i class="feather icon-more-horizontal"></i>
        </a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li><a href="javascript:" class="full-screen" onclick="javascript:toggleFullScreen()"><i class="feather icon-maximize-2"></i></a></li>
                <!-- <li class="nav-item dropdown">
                    <a class="dropdown-toggle" href="javascript:" data-toggle="dropdown">Opciones</a>
                    <ul class="dropdown-menu border">
                        <li><a class="dropdown-item" href="javascript:">Accion 1</a></li>
                        <li><a class="dropdown-item" href="javascript:">Accion 2</a></li>
                        <li><a class="dropdown-item" href="javascript:">Accion 3</a></li>
                    </ul>
                </li> -->
                <li class="nav-item">
                    <div class="main-search">
                        <div class="input-group">
                            <input type="text" id="m-search" class="form-control" placeholder="Search . . .">
                            <a href="javascript:" class="input-group-append search-close">
                                <i class="feather icon-x input-group-text"></i>
                            </a>
                            <span class="input-group-append search-btn btn">
                                <i class="feather icon-search input-group-text"></i>
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
               <!--  <li>
                    <div class="dropdown">
                        <a class="dropdown-toggle" href="javascript:" data-toggle="dropdown"><i class="icon feather icon-bell"></i><span class="badge badge-info position-absolute badge-bell">9</span></a>
                        <div class="dropdown-menu dropdown-menu-right notification shadow">
                            <div class="noti-head border-bottom border-left border-right h6">
                                <h6 class="d-inline-block m-b-0">Notificaciones</h6>
                                <div class="float-right">
                                    <a href="javascript:" class="m-r-10">Marcar como leidas</a>
                                    <a href="javascript:">Limpiar</a>
                                </div>
                            </div>
                            <ul class="noti-body border-left border-right">
                                <li class="n-title">
                                    <p class="m-b-0">Recientes</p>
                                </li>
                                <li class="notification">
                                    <div class="media">
                                        <img class="img-radius" src="../assets/images/ic_launcher-web.png" alt="Generic placeholder image">
                                        <div class="media-body">
                                            <p><strong>LIMBERTH VASQUEZ</strong><span class="n-time text-muted"><i class="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                            <p>Nueva elemento agregado</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="n-title">
                                    <p class="m-b-0">Anteriores</p>
                                </li>
                                <li class="notification">
                                    <div class="media">
                                        <img class="img-radius" src="../assets/images/user/avatar-2.jpg" alt="Generic placeholder image">
                                        <div class="media-body">
                                            <p><strong>Joseph William</strong><span class="n-time text-muted"><i class="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                            <p>Te ha enviado un nuevo mail</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="notification">
                                    <div class="media">
                                        <img class="img-radius" src="../assets/images/user/avatar-3.jpg" alt="Generic placeholder image">
                                        <div class="media-body">
                                            <p><strong>Sara Soudein</strong><span class="n-time text-muted"><i class="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                            <p>Acaba de inicar sesion</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="noti-footer border-top border-right border-left">
                                <a href="javascript:">Mostrar todas</a>
                            </div>
                        </div>
                    </div>
                </li> -->
                <li>
                    <div class="dropdown drp-user">
                        <a href="javascript:" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon feather icon-settings"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right profile-notification border-bottom border-left border-right shadow">
                            <div class="pro-head">
                                <!-- <img src="../assets/images/ic_launcher-web.png" class="img-radius" alt="User-Profile-Image"> -->
                                <span id="userLoginName2"></span>
                                <a href="" class="dud-logout btnLogout" title="Logout" id="btnLogout">
                                    <i class="feather icon-log-out"></i>
                                </a>
                            </div>
                            <ul class="pro-body">
                                <li><a href="javascript:" class="dropdown-item"><i class="feather icon-settings"></i> Configuration</a></li>
                                <li><a href="javascript:" class="dropdown-item"><i class="feather icon-user"></i> Profile</a></li>
                                <!-- <li><a href="#" class="dropdown-item"><i class="feather icon-mail"></i> Mis Mensajes</a></li>
                                <li><a href="#" class="dropdown-item"><i class="feather icon-lock"></i> Pantalla de bloqueo</a></li> -->
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>`;
    document.getElementById("leftMenuSection").innerHTML =
        `<div class="navbar-wrapper">
            <div class="navbar-brand header-logo">
                <a href="index.html" class="b-brand">
                    <label><img src="../assets/images/keystore_logo.png" class="image-responsive" width="100px"
                            height="50px"></label>
                </a>
                <a class="mobile-menu" id="mobile-collapse" href="javascript:"><span></span></a>
            </div>
            <div class="navbar-content scroll-div">
                <ul class="nav pcoded-inner-navbar">
                    <li class="nav-item active pcoded-menu-caption mb-2">
                        <!-- <label style="font-size: 12px;"><img src="../assets/images/ic_launcher-web.png" class="circle mr-3 image-responsive" width="55px" height="55px">Limberth Vasquez</label> -->
                        <label style="font-size: 12px;" id="userLoginName"></label>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Navigation</label>
                    </li>
                    <li data-username="dashboard" class="nav-item ">
                        <a href="index.html" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-home"></i></span><span class="pcoded-mtext">Dashboard</span></a>
                    </li>              
                   
                    <li class="nav-item pcoded-menu-caption">
                        <label>Forms & tables</label>
                    </li>
                    <!-- <li data-username="Authentication Sign up Sign in reset password Change password Personal information profile settings map form subscribe"
                        class="nav-item pcoded-hasmenu">
                        <a href="#" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-lock"></i></span><span
                                class="pcoded-mtext">Authentication</span></a>
                        <ul class="pcoded-submenu">
                            <li class=""><a href="../auth-signup.html" class="" target="_blank">Sign up</a></li>
                            <li class=""><a href="../auth-signin.html" class="" target="_blank">Sign in</a></li>
                        </ul>
                    </li> -->
                    
                    <!-- <li data-username="Services" class="nav-item pcoded-hasmenu">
                        <a href="#" class="nav-link "><span class="pcoded-micon"><i class="feather icon-more-horizontal"></i></span><span class="pcoded-mtext">Services</span></a>
                        <ul class="pcoded-submenu">
                            <li class=""><a href="" class="" target="_blank">Type Services </a></li>
                            <li class=""><a href="" class="" target="_blank">Services Advertiser</a></li>
                            <li class=""><a href="" class="" target="_blank">Services Warehouse</a></li>
                        </ul>
                    </li> -->
                    <!-- <li class="nav-item pcoded-menu-caption">
                        <label>Lista 2</label>
                    </li> -->
                    <li data-username="Contracts" class="nav-item">
                        <a href="underConstruction.html" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-sidebar"></i></span><span class="pcoded-mtext">Contracts</span>
                        </a>
                    </li>
                    <li data-username="Warehouses" class="nav-item ">
                        <a href="warehouse.html" class="nav-link"><span class="pcoded-micon"><i
                                    class="feather icon-home"></i></span>
                            <span class="pcoded-mtext">Warehouses</span>
                        </a>
                    </li>
                    <li data-username="Events" class="nav-item">
                        <a href="events.html" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-zap"></i></span><span class="pcoded-mtext">Events</span>
                        </a>
                    </li>
                    <li data-username="Publicities" class="nav-item">
                        <a href="underConstruction.html" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-mail"></i></span><span class="pcoded-mtext">Publicities</span>
                        </a>
                    </li>
                    <li data-username="Locations" class="nav-item">
                        <a href="underConstruction.html" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-map-pin"></i></span><span class="pcoded-mtext">Locations</span>
                        </a>
                    </li>
                    <li data-username="Roles" class="nav-item">
                        <a href="roles.html" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-server"></i></span>
                            <span class="pcoded-mtext">Roles</span>
                        </a>
                    </li>
                    <li data-username="Type Services" class="nav-item">
                        <a href="typeservices.html" class="nav-link"> <span class="pcoded-micon"><i
                                    class="feather icon-sidebar"></i></span>
                            <span class="pcoded-mtext">Type Services</span>
                        </a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Users</label>
                    </li> 
                    <!--<li data-username="Users" class="nav-item pcoded-hasmenu">
                        <a href="#" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-user"></i></span>
                            <span class="pcoded-mtext">Users</span>
                        </a>
                        <ul class="pcoded-submenu">
                            <li class=""><a href="useradvertiser.html" class="" >Advertiser Users</a></li>
                            <li class=""><a href="userclient.html" class="" >Client Users</a></li>
                            <li class=""><a href="userevent.html" class="" >Event Users</a></li>
                            <li class=""><a href="userowner.html" class="" >Warehouse Users</a></li>
                        </ul>
                    </li>-->
                    
                    <li data-username="Users Advertiser" class="nav-item">
                        <a href="underConstruction.html" class="nav-link">
                            <span class="pcoded-micon">
                                <i class="feather icon-user"></i>
                            </span>
                            <span class="pcoded-mtext">Advertiser</span>
                        </a>
                    </li>
                    <li data-username="Users Client" class="nav-item">
                        <a href="underConstruction.html" class="nav-link">
                            <span class="pcoded-micon">
                                <i class="feather icon-user"></i>
                            </span>
                            <span class="pcoded-mtext">Client</span>
                        </a>
                    </li>
                    <li data-username="Users Event" class="nav-item">
                        <a href="underConstruction.html" class="nav-link">
                            <span class="pcoded-micon">
                                <i class="feather icon-user"></i>
                            </span>
                            <span class="pcoded-mtext">Event</span>
                        </a>
                    </li>
                    <li data-username="Users Warehouse" class="nav-item">
                        <a href="underConstruction.html" class="nav-link">
                            <span class="pcoded-micon">
                                <i class="feather icon-user"></i>
                            </span>
                            <span class="pcoded-mtext">Warehouse</span>
                        </a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Configurations</label>
                    </li> 
                    <li data-username="Configurations FAQ" class="nav-item">
                        <a href="FAQ.html" class="nav-link"><span class="pcoded-micon"><i class="feather icon-book"></i>
                            </span>
                            <span class="pcoded-mtext">FAQ</span>
                        </a>
                    </li>
                    <li data-username="Configurations Terms & Conditions" class="nav-item">
                        <a href="terms&conditions.html" class="nav-link"><span class="pcoded-micon"><i class="feather icon-check-square"></i>
                            </span>
                            <span class="pcoded-mtext">Terms & Conditions</span>
                        </a>
                    </li>
                    <li data-username="Configurations About us" class="nav-item">
                        <a href="aboutUs.html" class="nav-link"><span class="pcoded-micon"><i class="feather icon-clipboard"></i>
                            </span>
                            <span class="pcoded-mtext">About Us</span>
                        </a>
                    </li>
                    <!-- <li data-username="Disabled Menu" class="nav-item disabled"><a href="javascript:" class="nav-link"><span class="pcoded-micon"><i class="feather icon-power"></i></span><span class="pcoded-mtext">Disabled menu</span></a></li> -->
                </ul>
            </div>
        </div>`;
});
