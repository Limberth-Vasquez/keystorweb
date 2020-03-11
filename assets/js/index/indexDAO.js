class IndexDAO extends DAO{
    constructor() {
        super('Index');
    }
    signOut(){
        super.signOut();
    } 
    loadUserLogin(user) {
        return super.loadUserLogin(user);
    }    
}
