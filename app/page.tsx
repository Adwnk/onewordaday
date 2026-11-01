import DailyWords from "@/components/DailyWords";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-5 py-12">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-stone-900">One Word A Day</h1>
        <p className="mt-2 text-stone-600">
          An everyday Korean & Tagalog word — read it, hear it, learn it.
        </p>
      </header>
      <DailyWords />
    </main>
  );
}
