class DAO {
    constructor(collection) {
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.collection = collection;
    }
    /*****************************************************************************************************/
    loadUserLogin(user) {
        return this.auth.onAuthStateChanged(user);
    }
    /*****************************************************************************************************/
    signOut() {
        return this.auth.signOut();
    }
    /*****************************************************************************************************/
    delete(id) {
        return this.db.collection(this.collection).doc(id).delete();
    }
    /*****************************************************************************************************/
    getById(id) {
        return this.db.collection(this.collection).doc(id).get();
    }
    /*****************************************************************************************************/
    getAll() {
        return this.db.collection(this.collection).where("deleted", "==", false);
    }
    /*****************************************************************************************************/
    deactivate(id) {
        return this.db.collection(this.collection).doc(id).set({
            deleted: true
        }, { merge: true });
    }
    /*****************************************************************************************************/
    activeFalseAll(recentId) {
        this.getAll().onSnapshot(querySnapshot => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach(doc => {
                    //console.log(doc);
                    if (recentId != doc.id) {
                        return this.db.collection(this.collection).doc(doc.id).set({
                            active: false
                        }, { merge: true });
                    }
                });
            }
        });
    }
    /*****************************************************************************************************/
}