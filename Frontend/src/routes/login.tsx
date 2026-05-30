import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/LoginForm";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login — Roamly" },
      {
        name: "description",
        content: "Sign in to your Roamly account and start planning your trips.",
      },
    ],
  }),
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
        <LoginForm />
      </div>
    </div>
  );
}
