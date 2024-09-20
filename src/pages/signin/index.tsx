import AuthPageLayout from '@/layouts/AuthPagegLayout';
import SigninForm from '@/pages/signin/components/SigninForm';

export default function LoginPage() {
  return (
    <AuthPageLayout page='signin'>
      <SigninForm />
    </AuthPageLayout>
  );
}
