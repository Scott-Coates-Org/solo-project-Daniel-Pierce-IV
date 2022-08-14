import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
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

  static async getAllThen(callback) {
    callback(await this.getAll());
  }

  // Returns documents with matching ids as Objects from collection
  static async getByIds(ids) {
    const docs = await Promise.all(
      ids.map((id) => getDoc(doc(db, this.collectionName, id)))
    );

    return docs.map(this.ObjectFactory);
  }

  static async getByIdsThen(ids, callback) {
    callback(await this.getByIds(ids));
  }

  // Creates a new document in the collection
  static async add(data) {
    if (!data || Object.keys(data).length === 0) {
      throw Error('Missing data, not connecting to database');
    }

    try {
      const ref = await addDoc(collection(db, this.collectionName), data);
    } catch (error) {
      console.log(error);
    }
  }

  static async addThen(data, callback) {
    callback(await this.add(data));
  }
}
