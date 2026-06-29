import LoginForm from "@/features/auth/components/LoginForm";
import LoginHero from "@/features/auth/components/LoginHero";

export default function LoginPage() {
  return (
    <main className="h-full overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-4xl border border-white/70 bg-white/70 shadow-2xl shadow-slate-900/10 backdrop-blur-xl lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.1fr_0.9fr]">
        <LoginHero />
        <LoginForm />
      </div>
    </main>
  );
}