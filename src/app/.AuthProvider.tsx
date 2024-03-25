// 'use client';
// import React, { useState, useEffect, createContext, ReactNode } from 'react';
// import { auth, db } from './firebaseConfig';
// import { User } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { useAppDispatch } from '@/hooks/useAppDispatch';
// import {
//   setCartItems,
//   // setPurchaseItems,
//   setWishlist,
// } from '@/slices/productSlict';

// interface AuthContextProps {
//   currentUser: User | null;
//   setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

// export const AuthContext = createContext<AuthContextProps>({
//   currentUser: null,
//   setCurrentUser: () => null,
// });

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const dispatch = useAppDispatch();
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   async function getUserSnapshot(user: User) {
//     if (!user.email) return null;
//     const userDocRef = doc(db, 'users', user.email);
//     try {
//       const userSnap = await getDoc(userDocRef);
//       return userSnap.exists() ? userSnap.data() : null;
//     } catch (error) {
//       console.error('Failed to get user snapshot:', error);
//       return null;
//     }
//   }

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       if (!user) {
//         setLoading(false);
//         return;
//       }
//       getUserSnapshot(user).then((userData) => {
//         if (userData) {
//           dispatch(setWishlist(userData.wishlist || {}));
//           dispatch(setCartItems(userData.cartItems || {}));
//         }
//         setLoading(false);
//       });
//     });
//   }, []);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-full">
//         <span className="loading loading-ring loading-lg"></span>
//       </div>
//     );

//   return (
//     <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
