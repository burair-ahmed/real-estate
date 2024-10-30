// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
export const uploadImage = (file, propertyTitle, onUploadProgress = () => {}) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);

    const sanitizedTitle = propertyTitle.toLowerCase().replace(/\s+/g, '-'); // Sanitize title for folder name
    const storageRef = ref(storage, `images/${sanitizedTitle}/${file.name}`); // Use the property title as folder name
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Calculate progress percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onUploadProgress(progress); // Call the progress callback
      },
      (error) => {
        console.error("Error uploading image:", error);
        reject(error);
      },
      async () => {
        // Handle successful uploads
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL); // Return the image URL
      }
    );
  });
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
