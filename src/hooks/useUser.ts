import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

import { auth } from '../firebase';

const useUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
    });
  }, []);

  return user;
};

export default useUser;
