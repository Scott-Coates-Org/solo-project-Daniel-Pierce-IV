import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { db } from '../client';

export default class Model {
  static ObjectFactory(document) {
    return {
      id: document.id,
      ...document.data(),
    };
  }

  // Returns all documents as Objects from collection
  static async getAll() {
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    return querySnapshot.docs.map(this.ObjectFactory);
  }

  // Returns a single document with matching id as Object as from collection
  static async getById(id) {
    return getDoc(doc(db, this.collectionName, id)).then(this.ObjectFactory);
  }

  // Returns documents with matching ids as Objects from collection
  static async getByIds(ids) {
    const docs = await Promise.all(
      ids.map((id) => getDoc(doc(db, this.collectionName, id)))
    );

    return docs.map(this.ObjectFactory);
  }

  // Creates a new document in the collection
  static async add(data) {
    if (!data || Object.keys(data).length === 0) {
      throw Error('Missing data, not connecting to database');
    }

    try {
      return addDoc(collection(db, this.collectionName), data);
    } catch (error) {
      console.log(error);
    }
  }

  // Updates (or creates) a document in the collection
  static async set({ id, ...data }) {
    if (!id || Object.keys(data).length === 0) {
      throw Error('Missing data, not connecting to database');
    }

    const docRef = doc(db, this.collectionName, id);

    try {
      return setDoc(docRef, data);
    } catch (error) {
      console.log(error);
    }
  }
}
