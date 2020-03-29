$(() => {
  //START
  const _landing = new LandingDAO();
  getAboutUs();
  getFAQs();
  //START

  /*****************************************************************************************************/
  function getAboutUs() {
    _landing.getAboutUs().onSnapshot(querySnapshot => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach(result => {
          $('#about').empty();
          querySnapshot.forEach(row => {
            let rowHtml = getAboutUsTemplate(
              row.data().descAboutUs1,
              row.data().titleh2,
              row.data().titleh3,
              row.data().shortDescp,
              row.data().li1,
              row.data().li2,
              row.data().li3,
              //'KeyStor is a Spanish-based startup in the process of building its technological platform to operate the below business model',
              //'Keystor is a one platform for a whole business ecosystems',
              //'We are a service ecosystem in which services companies can participate and create additional value for themselves and our customers',
              //'We help companies to manage their seasonality, or simply a peak in the demand or an extraordinary situation for which they need extra and temporary space.',//row.data().description,
              //'We take extra care concerning the value/protection of customer data. ',
              //'We enable companies to take risks, entering a market with the flexibility to step out in case this is not working.',
              //'We offer speed and flexibility to companies allowing them to search real time for available space and connect them with warehouse owners instantly and for free.',
            );
            $('#about').append(rowHtml)
          });
        });
      }
    });
  }
  /*****************************************************************************************************/
  function getFAQs() {
    _landing.getFAQs().onSnapshot(querySnapshot => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach(result => {
          $('#faq-list').empty();
          querySnapshot.forEach(row => {
            let rowHtml = getFAQTemplate(
              row.id,
              row.data().question,
              row.data().answer
            );
            $('#faq-list').append(rowHtml)
          });
        });
      }
    });
  }
  /*****************************************************************************************************/
  function getAboutUsTemplate(descAboutUs1, titleh2, titleh3, shortDescp, li1,li2,li3) {
    return ` <div class="container-fluid">
        <div class="section-header">
          <h3 class="section-title">About Us</h3>
          <span class="section-divider"></span>
          <p class="section-description">
          ${descAboutUs1}
          </p>
        </div>

        <div class="row">
          <div class="col-lg-6 about-img wow fadeInLeft">
            <img src="assets/img/about-img.jpg" alt="">
          </div>

          <div class="col-lg-6 content wow fadeInRight">
            <h2>${titleh2}</h2>
            <h3>${titleh3}</h3>
            <p>
              ${shortDescp}
            </p>

            <ul>
              <li><i class="ion-android-checkmark-circle"></i> ${li1}</li>
              <li><i class="ion-android-checkmark-circle"></i> ${li2}</li>
              <li><i class="ion-android-checkmark-circle"></i> ${li3}</li>
            </ul>
          </div>
        </div>

      </div>`;
  }
  /*****************************************************************************************************/
  function getFAQTemplate(id, question, answer) {
    return `<li>
              <a data-toggle="collapse" class="collapsed" href="#faq${id}">
                ${question} <i class="ion-android-remove"></i>
              </a>
              <div id="faq${id}" class="collapse" data-parent="#faq-list">
                <p> 
                  ${answer} 
                </p>
              </div>
            </li>`;
  }
  /*****************************************************************************************************/
});