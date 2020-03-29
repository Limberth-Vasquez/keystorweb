class AboutUsDAO extends DAO {
    constructor() {
        super('AboutUs');
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
            //title: obj.title,
            //description: obj.description
            descAboutUs1: obj.descAboutUs1,
            titleh2: obj.titleh2,
            titleh3: obj.titleh3,
            shortDescp: obj.shortDescp,
            li1: obj.li1,
            li2: obj.li2,
            li3: obj.li3
        });
    }
    update(obj) {
        return this.db.collection(this.collection).doc(obj.id).set({
            active: obj.active,
            //title: obj.title,
            //description: obj.description
            descAboutUs1: obj.descAboutUs1,
            titleh2: obj.titleh2,
            titleh3: obj.titleh3,
            shortDescp: obj.shortDescp,
            li1: obj.li1,
            li2: obj.li2,
            li3: obj.li3
        }, { merge: true });
    }
    activeFalseAll(recentId) {
        return super.activeFalseAll(recentId);
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