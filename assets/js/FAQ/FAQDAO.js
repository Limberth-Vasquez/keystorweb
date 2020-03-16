class FAQDAO extends DAO {
    constructor() {
        super('FAQ');
    }

     loadUserLogin(user) {
        return super.loadUserLogin(user);
    }
    signOut(){
        super.signOut();
    } 
    create(obj) {
        return this.db.collection(this.collection).add({
            active: true,
            deleted: false,
            question: obj.question,
            answer: obj.answer
        });
    }
    update(obj) {
        return this.db.collection(this.collection).doc(obj.id).set({
            active: obj.active,
            question: obj.question,
            answer: obj.answer
        }, { merge: true });
    }
    deactivate(id){
        return super.deactivate(id);
    }
    delete(id) {
        return super.delete(id);
    }
    getById(id) {
        return super.getById(id);
    }
    getAll() {
        return super.getAll();
    } 
}