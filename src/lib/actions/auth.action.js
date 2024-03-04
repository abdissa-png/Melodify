import {getCurrentUser,getUserProfile} from "@/lib/store/slices";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import {
    onAuthStateChanged
  } from "@firebase/auth";
import { auth } from "@/configs"
export const useAuthState = () => {
    const {
      currentUser,
      userProfile:profile,
      error,
      isLoading
    } = useSelector((state)=>state.currentUser);
    const dispatch=useDispatch();
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const isPasswordEnabled = user?.providerData
            .reduce((acc, item) => {
              acc.push(item.providerId);
              return acc;
            }, [])
            ?.includes("password");
  
          const {
            uid,
            displayName: username,
            email,
            metadata:{...metadata},
            photoURL: imageUrl,
          } = user;
  
          dispatch(getCurrentUser({
            currentUser:{
                userId: profile && uid,
                user: {
                    profile:JSON.parse(JSON.stringify(profile)),
                    uid,
                    username,
                    email,
                    metadata:{...metadata},
                    imageUrl,
                    isPasswordEnabled,
                },
            },
            isLoading: false,
          }));
        } else {
          dispatch(getCurrentUser({currentUser:{}, isLoading: false }));
          dispatch(getUserProfile({ userProfile:null }));
        }
      });
      return unsubscribe;
    }, [getCurrentUser, profile]);
  };