'use client';

import { useSupabase } from '../supabase-provider';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Input from '@/components/Input';
import Modal from '@/components/modals/Modal';
import { getURL } from '@/utils/helpers';
import { truncate, truncateSync } from 'fs';
import { Router } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

export default function LoginModal() {
  const { supabase } = useSupabase();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Logged in');
        router.push(`${getURL()}/auth/callback`);
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };
  const onToggle = useCallback(() => {
    router.push('/auth/signup');
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />

      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          First time using Cruiseo?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {' '}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={true}
      title="Login"
      actionLabel="Continue"
      onClose={() => {}}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
