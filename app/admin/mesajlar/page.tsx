import type { Metadata } from "next";
import { deleteMessage } from "@/lib/actions";
import { formatDate } from "@/lib/format";
import { readMessages } from "@/lib/store";
import { ConfirmSubmit } from "@/components/confirm-submit";

export const metadata: Metadata = {
  title: "Mesajlar",
  robots: { index: false, follow: false },
};

export default async function AdminMessagesPage() {
  const messages = await readMessages();

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl">Gelen Mesajlar</h1>
          <p className="mt-2 text-sm text-ink-2">
            İletişim formundan gelen talepler burada listelenir.
          </p>
        </div>
        <span className="rounded-full bg-white px-4 py-2 text-sm text-ink-2">
          {messages.length} mesaj
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="card mt-8 p-14 text-center">
          <p className="font-display text-2xl">Gelen kutusu boş</p>
          <p className="mx-auto mt-3 max-w-md text-ink-2">
            Sitedeki iletişim formundan gelen mesajlar burada görünecek.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {messages.map((message) => (
            <article key={message.id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg">{message.name}</h2>
                    <span className="rounded-full bg-shell px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-sage">
                      {message.subject}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-3">
                    <a href={`mailto:${message.email}`} className="hover:text-sage">
                      {message.email}
                    </a>
                    {message.phone ? (
                      <a href={`tel:${message.phone}`} className="hover:text-sage">
                        {message.phone}
                      </a>
                    ) : null}
                    <span>{formatDate(message.createdAt)}</span>
                  </div>
                </div>

                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={message.id} />
                  <ConfirmSubmit
                    message="Bu mesaj kalıcı olarak silinsin mi?"
                    className="rounded-full border border-ink/12 px-3.5 py-1.5 text-xs text-ink-2 transition-colors hover:bg-shell"
                  >
                    Sil
                  </ConfirmSubmit>
                </form>
              </div>

              <p className="mt-4 whitespace-pre-line rounded-2xl bg-shell/70 p-4 text-sm leading-relaxed text-ink-2">
                {message.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
