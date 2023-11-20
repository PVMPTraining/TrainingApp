'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Database } from '../types/types';

import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  );

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      });

    router.refresh();
    router.push('/account');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-end gap-4 p-8">
        <h1 className="text-4xl font-bold">Welcome!</h1>
        <p>
          Proceed below to access the best sports app ever created on planet
          Earth!
        </p>
        <div className="flex gap-4 flex-col">
          <Link
            className="btn"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="btn"
            href="/signup"
          >
            Signup
          </Link>
        </div>
      </div>
    </>
  );
}
