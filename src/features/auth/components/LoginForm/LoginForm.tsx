import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Validators } from 'src/api/utils/validators';
import { Button } from 'src/components/Button/Button';
import { Field } from 'src/components/Field/Field';
import { Form } from 'src/components/Form/Form';
import { TextInput } from 'src/components/TextInput/TextInput';
import type { TypeOf } from 'zod';
import { z } from 'zod';

const loginFormInitialValues = {
  token: '',
};

const validationSchema = z.object({
  token: z.string().min(1, { message: Validators.REQUIRED_ERROR_MESSAGE }),
});

export type LoginFormData = TypeOf<typeof validationSchema>;

interface Props {

  /** Form submission callback. */
  readonly onSubmit: (data: LoginFormData) => void;

  /** Whether the form submission in process. */
  readonly isSubmitting: boolean;
}

/** Login form. */
const LoginFormComponent: FC<Props> = ({ onSubmit, isSubmitting }) => {
  const form = useForm({
    defaultValues: loginFormInitialValues,
    resolver: zodResolver(validationSchema),
  });

  return (
    <Form {...form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Field
            Component={TextInput}
            control={form.control}
            name="token"
            placeholder="Paste vndb token here"
          />
        </div>
        <Button type="submit" isDisabled={isSubmitting} className="h-min">Login</Button>
      </div>
    </Form>
  );
};

export const LoginForm = memo(LoginFormComponent);
