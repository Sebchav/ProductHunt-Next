import {initializeApp} from 'firebase/app';
import firebaseConfig from "./config";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "@firebase/auth";
import "firebase/firestore";
import { getFirestore } from 'firebase/firestore'

class Firebase {
    constructor(){
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db = getFirestore(app);
    }

    //Registra un usuario
    async registrar(nombre, email, password){
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);
        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }

    //Inicia sesión del usuario
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    //Cierra la sesión del usuario
    async cerrarSesion() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;