'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginForm({ searchParams }: { searchParams: { message: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

    const action = submitter.name === 'login' ? '/api/signin' : '/api/signup';

    const response = await fetch(action, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.error) {
      router.push(`/login?message=${result.error}`);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 pt-20 sm:max-w-md">
      <span className="pb-8 text-xl">Scrapify</span>

      <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in" onSubmit={handleSubmit}>
        <Label className="text-md mt-4" htmlFor="email">
          Email
        </Label>
        <Input
          className="mb-3 rounded-md border bg-inherit px-4 py-2 text-[16px]"
          name="email"
          placeholder="you@example.com"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          className="mb-6 rounded-md border bg-inherit px-4 py-2 text-[16px]"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <Button className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white" type="submit" name="login">
          Login
        </Button>

        <Button className="mb-2 rounded-md border border-foreground/20 px-4 py-2" type="submit" name="signup">
          Sign Up
        </Button>

        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">{searchParams.message}</p>
        )}
      </form>
    </div>
  );
}
