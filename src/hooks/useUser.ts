import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

import { auth } from '../firebase';

const useUser = (): [User | undefined, boolean] => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user !== undefined) setLoading(false);
  }, [user]);

  return [user, loading];
};

export default useUser;
