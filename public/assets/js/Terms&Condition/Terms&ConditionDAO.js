class TermsAndConditionDAO extends DAO {
    constructor() {
        super('TermsAndCondition');
    }

    loadUserLogin(user) {
        return super.loadUserLogin(user);
    }
    signOut() {
        return super.signOut();
    }
    create(obj) {
        return this.db.collection(this.collection).add({
            active: true,
            deleted: false,
            title: obj.title,
            description: obj.description
        });
    }
    update(obj) {
        return this.db.collection(this.collection).doc(obj.id).set({
            active: obj.active,
            title: obj.title,
            description: obj.description
        }, { merge: true });
    }
    deactivate(id) {
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