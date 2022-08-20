import {getFirestore} from 'firebase/firestore'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAakGeY5cx-egw-Chz3e6_9Yr-C7XViUEk",
  authDomain: "backend-eco-sym.firebaseapp.com",
  projectId: "backend-eco-sym",
  storageBucket: "backend-eco-sym.appspot.com",
  messagingSenderId: "88300753322",
  appId: "1:88300753322:web:b45c04eb88d3e95a669bd3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)