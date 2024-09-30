import AuthPageLayout from '@/layouts/AuthPagegLayout';
import SignupForm from '@/pages/signup/components/SignupForm';

export default function SignupPage() {
  return (
    <AuthPageLayout page='signup'>
      <SignupForm />
    </AuthPageLayout>
  );
}
