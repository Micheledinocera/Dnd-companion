import { vuexfireMutations, firestoreAction } from "vuexfire";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  limit,
  onSnapshot,
  getDocs,
  addDoc,
  orderBy,
  DocumentReference,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "@/firestore/db";
import { AppInfo } from "@/model/AppInfo";
import { User } from "@/model/User";
import firebase from "firebase/compat/app";
import { Campagna } from "@/model/Campagna";
import { Scheda } from "@/model/Scheda";

const firebaseStore = {
  state: {
    appInfo: new AppInfo() as AppInfo,
    user: new User() as User,
    ownedCampagne: [] as Campagna[],
    playerCampagne: [] as Campagna[],
    schedeCampagna: [] as Scheda[],
    selectedScheda: new Scheda() as Scheda,
  },
  getters: {
    getAppInfo: (state: { appInfo: AppInfo }): AppInfo => state.appInfo,
    getUser: (state: { user: User }): User => state.user,
    getOwnedCampagne: (state: { ownedCampagne: Campagna[] }): Campagna[] =>
      state.ownedCampagne,
    getPlayerCampagne: (state: { playerCampagne: Campagna[] }): Campagna[] =>
      state.playerCampagne,
    getSchedeCampagna: (state: { schedeCampagna: Scheda[] }): Scheda[] => state.schedeCampagna,
  },
  mutations: vuexfireMutations,
  actions: {
    bindAppInfo: firestoreAction((context) => {
      const q = query(collection(db, AppInfo.tableName));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          (context.state as any).appInfo = doc.data();
        });
      });
    }),
    bindUser: firestoreAction(async (context, uid: string) => {
      const q = query(
        collection(db, User.tableName),
        where(firebase.firestore.FieldPath.documentId(), "==", uid),
        limit(1)
      );
      const getQuerySnapshot = await getDocs(q);
      getQuerySnapshot.forEach((doc) => {
        (context.state as any).user = { uid: uid, ...doc.data() };
      });
    }),
    addUser: firestoreAction(async (context, user: User) => {
      await setDoc(doc(db, User.tableName, user.uid), {
        name: user.name,
        email: user.email,
      });
      (context.state as any).user = new User(user);
    }),
    setEmptyUser: (context: any) => {
      context.state.user = new User();
    },
    bindOwnedCampagne: firestoreAction(async (context, uid: string) => {
      const q = query(collection(db, Campagna.tableName));
      onSnapshot(q, (querySnapshot) => {
        (context.state as any).ownedCampagne = [];
        querySnapshot.forEach(async (doc) => {
          const docData = doc.data();
          if (docData.master.id == uid)
            (context.state as any).ownedCampagne.push({
              id: doc.id,
              ...docData,
            });
        });
      });
    }),
    bindPlayerCampagne: firestoreAction(async (context, uid: string) => {
      const q = query(collection(db, Campagna.tableName));
      onSnapshot(q, (querySnapshot) => {
        (context.state as any).playerCampagne = [];
        querySnapshot.forEach(async (doc) => {
          const docData = doc.data();
          if (docData.players.some((item: DocumentReference) => item.id == uid))
            (context.state as any).playerCampagne.push({
              id: doc.id,
              ...docData,
            });
        });
      });
    }),
    bindSchedeCampagna: firestoreAction(async (context, campagnaId: string) => {
      db.collection('users').doc(campagnaId)
      // const q = query(collection(db, Campagna.tableName),where("id","==",campagnaId));
      // debugger;
      // onSnapshot(q, (querySnapshot) => {
      //   (context.state as any).playerCampagne = [];
      //   querySnapshot.forEach((doc) => {
      //     const docData = doc.data().collection(Scheda.tableName);
      //     debugger;
      //     if (docData.players.some((item: DocumentReference) => item.id == campagnaId))
      //       (context.state as any).playerCampagne.push({
      //         id: doc.id,
      //         ...docData,
      //       });
      //   });
      // });
    }),
    // bindGuestsFromCasa: firestoreAction(async (context, casaId: string) => {
    //   const q = query(
    //     collection(db, Transaction.tableName),
    //     where("casaId", "==", casaId)
    //   );
    //   onSnapshot(q, async (querySnapshot) => {
    //     const guestsId = [] as string[];
    //     querySnapshot.forEach((doc) => {
    //       guestsId.push(doc.data().utenteId);
    //     });
    //     if (guestsId.length > 0) {
    //       const subq = query(
    //         collection(db, User.tableName),
    //         where(firebase.firestore.FieldPath.documentId(), "in", guestsId)
    //       );
    //       const getQuerySnapshot = await getDocs(subq);
    //       (context.state as any).guestsCasa = [];
    //       getQuerySnapshot.forEach((doc) => {
    //         (context.state as any).guestsCasa.push({
    //           uid: doc.id,
    //           ...doc.data(),
    //         });
    //       });
    //     } else (context.state as any).guestsCasa = [];
    //   });
    // }),
    // bindUserTransaction: firestoreAction(async (context, utenteId: string) => {
    //   const q = query(
    //     collection(db, Transaction.tableName),
    //     where("utenteId", "==", utenteId)
    //     // orderBy("timestamp","desc")
    //   );

    //   onSnapshot(q, (querySnapshot) => {
    //     (context.state as any).userTransactions = [];
    //     querySnapshot.forEach((doc) => {
    //       (context.state as any).userTransactions.push(doc.data());
    //     });
    //   });
    // }),
    // bindCasaTransaction: firestoreAction((context, casaId: string) => {
    //   const q = query(
    //     collection(db, Transaction.tableName),
    //     where("casaId", "==", casaId)
    //     // orderBy("timestamp","desc")
    //   );
    //   onSnapshot(q, (querySnapshot) => {
    //     (context.state as any).casaTransactions = [];
    //     querySnapshot.forEach((doc) => {
    //       (context.state as any).casaTransactions.push(doc.data());
    //     });
    //   });
    // }),
    // addCasa: firestoreAction(async (context, casa: Casa) => {
    //   await addDoc(collection(db, Casa.tableName), {
    //     owner: casa.owner,
    //     nome: casa.nome,
    //   }).then((addedCasa) => {
    //     (context.rootState as any).selectedCasa = new Casa({
    //       id: addedCasa.id,
    //       owner: casa.owner,
    //       nome: casa.nome,
    //     });
    //   });
    // }),
    // addTransaction: firestoreAction((context, transaction: Transaction) => {
    //   addDoc(collection(db, Transaction.tableName), transaction);
    // }),
  },
};

export default firebaseStore;
