$(() => {
    //START
    const _landing = new LandingDAO();
    getAboutUs();
    //getFAQs();
    //START

    /*****************************************************************************************************/
    function getAboutUs() {
        _landing.getAboutUs().onSnapshot(querySnapshot => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach(result => {
                    $('#about').empty();
                    querySnapshot.forEach(row => {
                        let rowHtml = getAboutUsTempate(
                            row.data().description
                        );
                        $('#about').append(rowHtml)
                    });
                });
            }
        });
    }
    /*****************************************************************************************************/
    function getFAQs() {
        _landing.getFAQs().then(() => {

        }).catch(err => {
            //printDangerAlert('Error retrieving FAQs data: ' + err.message);
            console.log('Error retrieving FAQs data: ', err.message);
        });
    }
    /*****************************************************************************************************/
    function getAboutUsTempate(descripcion) {
        return ` <div class="container-fluid">
        <div class="section-header">
          <h3 class="section-title">About Us</h3>
          <span class="section-divider"></span>
          <p class="section-description">
          ${descripcion}
          </p>
        </div>

        <div class="row">
          <div class="col-lg-6 about-img wow fadeInLeft">
            <img src="assets/img/about-img.jpg" alt="">
          </div>

          <div class="col-lg-6 content wow fadeInRight">
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elite storium paralate</h2>
            <h3>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <ul>
              <li><i class="ion-android-checkmark-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
              <li><i class="ion-android-checkmark-circle"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
              <li><i class="ion-android-checkmark-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
            </ul>

            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Libero justo laoreet sit amet cursus sit amet dictum sit. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec
            </p>
          </div>
        </div>

      </div>`;
    }
    /*****************************************************************************************************/
    /*****************************************************************************************************/
    /*****************************************************************************************************/

});