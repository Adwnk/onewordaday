import AppTabs from "@/components/AppTabs";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-5 py-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-stone-900">One Word A Day</h1>
        <p className="mt-2 text-stone-600">
          An everyday Korean & Tagalog verb — read it, hear it, learn it.
        </p>
      </header>
      <AppTabs />
    </main>
  );
}
