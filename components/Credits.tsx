export default function Credits() {
  return (
    <section className="flex flex-col gap-5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
      <p>Game music is used under the licenses below. The clips in this app are shortened from the original recordings.</p>
      <ul className="flex flex-col gap-4">
        <li>
          &apos;Amberlight&apos; by Scott Buckley — released under CC-BY 4.0.{" "}
          <a className="text-teal-700 underline dark:text-teal-300" href="https://www.scottbuckley.com.au" target="_blank" rel="noreferrer">
            www.scottbuckley.com.au
          </a>
          . Edited to the first minute.
        </li>
        <li>
          &apos;Undertow&apos; by Scott Buckley — released under CC-BY 4.0.{" "}
          <a className="text-teal-700 underline dark:text-teal-300" href="https://www.scottbuckley.com.au" target="_blank" rel="noreferrer">
            www.scottbuckley.com.au
          </a>
          . Edited to the first 1:15.
        </li>
        <li>Gymnopédie No. 1 by Erik Satie, performed by Robin Alciatore, via Musopen. Public domain. Edited to the first 1:30.</li>
        <li>Prelude No. 1 in C major, BWV 846 by Johann Sebastian Bach, performed by Kimiko Ishizaka. CC0 1.0. Edited to the first 1:30.</li>
      </ul>
    </section>
  );
}
