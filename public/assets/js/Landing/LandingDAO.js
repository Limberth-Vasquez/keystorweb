class LandingDAO {
    constructor() {
        //super('LandingPage');
        //this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    getAboutUs() {
        return this.db.collection("AboutUs").where("deleted", "==", false).where("active", "==", true);
    }
    getFAQs() {
        return this.db.collection("FAQ").where("deleted", "==", false).where("active", "==", true);
    }
}