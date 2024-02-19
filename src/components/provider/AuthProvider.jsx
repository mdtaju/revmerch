"use client";

const { auth } = require("@/lib/firebase.config");
const { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } = require("firebase/auth");
const { useState, useEffect } = require("react");

function useAuthState() {
      const [authState, setAuthState] = useState(null);

      useEffect(() => {
            onAuthStateChanged(auth, (user) => {
                  if (user) {
                        setAuthState(user);
                  } else {
                        setAuthState(false);
                  }
            });
      }, []);

      return authState;
}

export default useAuthState;