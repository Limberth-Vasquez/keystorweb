class DAO {
    constructor(collection) {
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.collection = collection;
    }
    loadUserLogin(user) {
        return this.auth.onAuthStateChanged(user);
    }
    signOut(){
        this.auth.signOut();
    }
    delete(id) {
        return this.db.collection(this.collection).doc(id).delete();
    }
    getById(id) {
        return this.db.collection(this.collection).doc(id).get();
    }
    getAll() {
        return this.db.collection(this.collection).where("deleted", "==", false);
    }
    deactivate(id){
        return this.db.collection(this.collection).doc(id).set({
            deleted: true
        }, { merge: true });
    }
}