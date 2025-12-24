import { TOURNAMENT_DATA } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-8" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground" data-testid="text-footer-prepared">
          {TOURNAMENT_DATA.footer.preparedBy}
        </p>
        <p className="text-sm text-muted-foreground mt-1" data-testid="text-footer-grant">
          {TOURNAMENT_DATA.footer.grantAck}
        </p>
      </div>
    </footer>
  );
}
