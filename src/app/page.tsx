'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Database } from '../types/types';
import Button from '../components/re-usable/Button/Button';
import Input from '../components/re-usable/Input/Input';

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
    <div className="flex flex-col gap-4">
      <h1>Email</h1>
      <Input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <h1>Password</h1>
      <Input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button onClick={handleSignUp}>Sign up</Button>
      <Button onClick={handleSignIn}>Sign in</Button>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
}
