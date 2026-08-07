import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030303] px-6">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
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