import React, { VFC } from 'react';
import { Button, Heading, Link, VStack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordInput, TextInput } from '../../../../components';
import { AuthData } from '../../../../models/authData';
import { Validators } from '../../../../utils/validators';
import cls from './LoginPage.module.css';

const loginFormInitialValues: AuthData.Login = {
  username: '',
  password: '',
};

const validationSchema = yup.object({
  username: yup.string().required(Validators.REQUIRED_ERROR_MESSAGE),
  password: yup.string().required(Validators.REQUIRED_ERROR_MESSAGE),
});

/** Login page. */
export const LoginPage: VFC = () => {
  const {
    control,
    handleSubmit,
  } = useForm({ defaultValues: loginFormInitialValues, resolver: yupResolver(validationSchema) });

  /**
   * Handles submission of the login form.
   * @param data Form data.
   */
  const handleFormSubmit = (data: AuthData.Login): void => {
    console.log(data);
  };

  return (
    <VStack paddingTop={32} gap={5} justifyContent="center" margin="auto" maxWidth="480px">
      <Heading as="h1" fontSize="xl">
        Log In
      </Heading>

      <form onSubmit={handleSubmit(handleFormSubmit)} className={cls.form}>
        <VStack gap={6}>
          <TextInput
            control={control}
            name="username"
            label="Username"
          />
          <PasswordInput
            control={control}
            name="password"
            label="Password"
          />
          <Button type="submit" width="100%">Continue</Button>
        </VStack>
      </form>

      <Text>
        Don&apos;t have an account?
        {' '}
        <Link
          variant="no-underline"
          href="https://vndb.org/u/register"
          target="_blank"
          color="var(--color-link)"
        >
          Sign up
        </Link>
      </Text>
    </VStack>
  );
};
