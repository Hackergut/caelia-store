import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { checkPassword, useLock } from "@/lib/lock";

export const Route = createFileRoute("/lock")({ component: LockPage });

function LockPage() {
  const unlocked = useLock((s) => s.unlocked);
  const unlock = useLock((s) => s.unlock);
  const lock = useLock((s) => s.lock);
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);

  return (
    <section className="bg-berry text-rosa">
      <div className="shell flex min-h-[80svh] max-w-md flex-col justify-center py-20">
        <p className="type-meta text-rosa/55">Lock</p>
        <h1 className="type-display-md mt-4">Anteprima.</h1>
        {unlocked ? (
          <>
            <p className="mt-6 leading-relaxed text-rosa/80">
              Watermark rimosso. Resta così su questo browser.
            </p>
            <div className="mt-10 flex gap-3">
              <Link to="/" className="btn-invert">
                Home
              </Link>
              <button type="button" className="btn-ghost-light" onClick={() => lock()}>
                Ripristina
              </button>
            </div>
          </>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!checkPassword(pwd)) {
                setErr(true);
                return;
              }
              unlock();
              void navigate({ to: "/" });
            }}
          >
            <label className="block text-sm text-rosa/80">
              Password
              <input
                type="password"
                autoFocus
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                  setErr(false);
                }}
                className="mt-2 min-h-12 w-full border border-rosa/25 bg-transparent px-3 text-rosa outline-none focus:border-rosa"
              />
            </label>
            {err ? <p className="text-sm text-rosa/70">Password non corretta.</p> : null}
            <button type="submit" className="btn-invert">
              Sblocca
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
