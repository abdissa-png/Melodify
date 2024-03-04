import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import useLocalStorage from "use-local-storage";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "@firebase/auth";

import { 
        getCurrentUser,
        getUserProfile 
    } from "@/lib/store/slices";
import { fbUpdateDoc, uploadImage, fbSnapshotDoc } from "@/lib/helpers";
import { useNotification } from "@/hooks";
import { auth } from "@/configs";

export const useGetProfile = () => {
    const [, setThemeLS] = useLocalStorage("theme-config");
    const [, setPlayerLS] = useLocalStorage("player");
  
    const { currentUser } = useSelector((state)=>state.currentUser);
    const { user } = currentUser || {};
    const dispatch = useDispatch();
    const [prof, setProf] = useState(null);
    useEffect(() => {
      const callback = (doc) => {
        setProf(doc?.data());
        setThemeLS(doc?.data()?.prefs);
        setPlayerLS(doc?.data()?.player);
        dispatch(getUserProfile({userProfile:doc?.data()}));
      };
  
      const unsub = fbSnapshotDoc({
        collection: "users",
        id: user?.uid,
        callback,
      });
  
      return () => unsub;
    }, [setPlayerLS, setThemeLS, user?.uid]);
  
    return prof;
};

export const useUpdateProfile = () => {
  const { currentUser } = useSelector((store)=>store.currentUser);
  const { userId } = currentUser || {};
  const [notify] = useNotification();
  const [isValidating,setIsValidating]=useState(false);
  const [error,setError]=useState(null);

  const fetcher = async (values) => {
    if (userId) {
      try {
        setIsValidating(true);
        let profileImage = null;
        if (values?.files) {
          profileImage = await uploadImage({
            imageFile: values?.files[0],
            storagePath: `users/${userId}`,
            fileName: "avatar.jpg",
          });
        }

        await updateProfile(auth.currentUser, {
          photoURL: profileImage,
          displayName: values?.username,
        });

        await fbUpdateDoc({
          data: { username: values?.username, photoURL: profileImage },
          collection: "users",
          id: userId,
        });

        notify({
          title: "Success",
          variant: "success",
          description: "Profile updated successfully",
        });
      } catch (err) {
        setError(err?.code)
        // console.error("error", err);
        notify({
          title: "Error",
          variant: "error",
          description: "An error occurred!",
        });
        // throw err; // Re-throw the error for useSWR to handle errors
      } finally {
        setIsValidating(false)
      }
    }
  };

  const isSubmitting = isValidating;
  const isSubmitted = !error;

  

  return { updateUserProfile:fetcher, isSubmitting, isSubmitted, error };
};

export const useUpdateAccountTheme= () => {
  const [, setThemeLS] = useLocalStorage("theme-config");
  const { currentUser } = useSelector((store)=>store.currentUser);
  const { userId } = currentUser || {};
  const [isValidating,setIsValidating]=useState(false);
  const [error,setError]=useState(null);
  const fetcher = async (prefs) => {
    if (userId) {
      try {
        setIsValidating(true)
        await fbUpdateDoc({
          data: { prefs },
          collection: "users",
          id: userId,
        });
      } catch (err) {
        setError(err?.code);
      } finally {
        setIsValidating(false)
      }
    } else {
      setThemeLS(prefs);
    }
  }
  
  const isSubmitting = isValidating;
  
  return { updateTheme:fetcher, isSubmitting,error };
};

export const useUpdateAccountPlayer = () => {
  const [, setPlayerLS] = useLocalStorage("melodify-player");
  const { currentUser } = useSelector((store)=>store.currentUser);
  const { userId } = currentUser || {};
  const [isValidating,setIsValidating]=useState(false);
  const [error,setError]=useState(null);
  const fetcher = async (player) => {
    if (userId) {
      try {
        setIsValidating(true);
        await fbUpdateDoc({
          data: { player: player },
          collection: "users",
          id: userId,
        });
      } catch (err) {
        setError(err?.code)
        // console.error("error", err);
        //throw err; //Re-throw the error for useSWR to handle errors
      } finally {
        setIsValidating(false)
      }
    } else {
      setPlayerLS(player);
    }
  };

  const isSubmitting = isValidating;

  return { updatePlayer:fetcher, isSubmitting, error };
};

export const useUpdatePassword = () => {
  const { currentUser } = useSelector((store)=>store.currentUser);
  const { userId } = currentUser || {};
  const [notify] = useNotification();
  const [isValidating,setIsValidating]=useState(false);
  const [error,setError]=useState(null);

  const fetcher = async (values) => {
    if (userId) {
      try {
        setIsValidating(true);
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          values?.currentPassword
        );
        await reauthenticateWithCredential(auth?.currentUser, credential);
        await updatePassword(auth?.currentUser, values?.newPassword);

        notify({
          title: "Success",
          variant: "success",
          description: "Password updated successfully",
        });
      } catch (err) {
        setError(err?.code)
        // console.error("error", err);
        notify({
          title: "Error",
          variant: "error",
          description: "An error occurred!",
        });
        //throw err; //Re-throw the error for useSWR to handle errors
      } finally {
        setIsValidating(false)
      }
    }
  };

  const isSubmitting = isValidating;
  const isSubmitted = !error;

  return { updatePass:fetcher , isSubmitting, isSubmitted, error };
};
