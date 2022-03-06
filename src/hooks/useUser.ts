import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

import { auth } from '../firebase';

const useUser = (): [User | undefined | null, boolean] => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user === null || user !== undefined) setLoading(false);
  }, [user]);

  return [user, loading];
};

export default useUser;
