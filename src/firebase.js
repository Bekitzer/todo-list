import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import config from '@/config'

const firebaseApp = initializeApp(config.firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export {db, storage, analytics}