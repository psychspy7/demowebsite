import Link from "next/link";
import { Brand } from "@/components/brand";
export default function NotFound() {
  return (
    <main className="error-page">
      <Brand />
      <span className="eyebrow">404 / NOT AVAILABLE</span>
      <h1>
        This page has
        <br />
        moved out of view.
      </h1>
      <p>
        The demo may be a draft, unpublished, expired, or the link may have
        changed.
      </p>
      <Link className="button dark" href="/">
        Back to the studio
      </Link>
    </main>
  );
}
