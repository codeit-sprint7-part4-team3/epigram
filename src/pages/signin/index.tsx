import AuthPageLayout from '@/layouts/AuthPagegLayout';
import SignInForm from '@/pages/signin/components/SignInForm';

export default function SignInPage() {
  return (
    <AuthPageLayout page='signin'>
      <SignInForm />
    </AuthPageLayout>
  );
}
