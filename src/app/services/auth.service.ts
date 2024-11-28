import { inject, Injectable } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = inject(Auth);
  private _firestore = inject(Firestore);

  docRef: any;
  docSnap: any;
  user$: any;
  user2: any;
  isAdmin: boolean = false;

  constructor( 
    
    private router: Router
  ) {   
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {  

        this.user$ = this.getUserDatabase();
        this.isAdmin = this.user$.isAdmin;      
      
        // ...
      } else {
        this.user$ = null;
        this.isAdmin = false;
        // ...
      }
    });
    
  }

  async userLogin(email: string, password: string) {
    const auth = getAuth();

    return await signInWithEmailAndPassword(auth, email, password).catch(
      (error) => {        
        console.log(error);
        return null;
      }
    );
  } // end of userLogin

  async getUserDatabase()
  {
    const auth = getAuth();         

    const docRef = doc(this._firestore, "user", auth.currentUser!.uid);
    const docSnap = await getDoc(docRef);     
    const user$ = docSnap.data();
    
    //console.log(user$)

    return user$;
  }

  getUserLogged() {
    const auth = getAuth();

    return auth.currentUser;
  } // end of getUserLogged

  async userLogout() {
    this.isAdmin = false;
    const auth = getAuth();

     await signOut(auth).then(()=>
    {
      console.log("Se cerro sesion correctamente");
    })
    .catch((error)=>
    {
      console.log(error);
    }); 
  } // end of logout
}
