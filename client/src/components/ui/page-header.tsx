interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="py-12 md:py-16 bg-muted/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-page-title">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-page-description">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
