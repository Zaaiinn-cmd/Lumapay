import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030303] px-6">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/dashboard"
        appearance={{
          variables: {
            colorPrimary: "#10b981",
            colorBackground: "#030303",
            colorText: "#ffffff",
            colorInputBackground: "#111111",
            colorInputText: "#ffffff",
          },
        }}
      />
    </main>
  );
}