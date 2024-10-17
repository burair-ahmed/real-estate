// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics'; // Importing analytics


const firebaseConfig = {
  apiKey: "AIzaSyAifkVy81UpxoUGEBBglsoDzF6YoMS8Xkw",
  authDomain: "the-prairies-hills.firebaseapp.com",
  projectId: "the-prairies-hills",
  storageBucket: "the-prairies-hills.appspot.com",
  messagingSenderId: "425845698840",
  appId: "1:425845698840:web:743a9e87a70b261217ae6d",
  measurementId: "G-2XVD5VMBKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app); // Only initialize on the client side
}

const storage = getStorage(app);


export const uploadImage = async (file) => {
    if (!file) return null;
  
    const storageRef = ref(storage, `images/${file.name}`); // Customize the path as needed
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL; // Return the image URL
  };