import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import type { ReactNode } from 'react';

const MainLayout = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();

  const changeUser = useCallback(() => {
    localStorage.setItem('authFormData', '');
    router.push('/');
  }, [router]);

  return (
    <main className="commonMain">
      <header>
        <Link href="/">Green Api</Link>
        <button onClick={changeUser}>Сменить пользователя</button>
      </header>
      <section className="main">{children}</section>
      <footer>© 2023 GREEN API</footer>
    </main>
  );
};

export default MainLayout;
