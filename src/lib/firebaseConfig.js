// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

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

// Upload image to Firebase Storage
export const uploadImage = async (file, propertyTitle) => {
  if (!file) return null;
  
  const sanitizedTitle = propertyTitle.toLowerCase().replace(/\s+/g, '-'); // Sanitize title for folder name
  const storageRef = ref(storage, `images/${sanitizedTitle}/${file.name}`); // Use the property title as folder name
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL; // Return the image URL
};

// Upload video to Firebase Storage
export const uploadVideo = async (file, propertyTitle) => {
  if (!file) return null;

  const sanitizedTitle = propertyTitle.toLowerCase().replace(/\s+/g, '-'); // Sanitize title for folder name
  const storageRef = ref(storage, `video/${sanitizedTitle}/${file.name}`); // Use the property title as folder name for videos
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL; // Return the video URL
};
