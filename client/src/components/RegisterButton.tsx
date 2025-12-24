import { Button } from "@/components/ui/button";
import { REGISTRATION_URL, isRegistrationAvailable } from "@/lib/constants";
import { Link } from "wouter";

interface RegisterButtonProps {
  size?: "default" | "sm" | "lg";
  className?: string;
  variant?: "default" | "outline";
}

export function RegisterButton({ size = "default", className = "", variant = "default" }: RegisterButtonProps) {
  const available = isRegistrationAvailable();

  if (available) {
    return (
      <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
        <Button size={size} variant={variant} className={className} data-testid="button-register-external">
          Register Now
        </Button>
      </a>
    );
  }

  return (
    <Link href="/register">
      <Button size={size} variant={variant} className={className} data-testid="button-register-info">
        Register Now
      </Button>
    </Link>
  );
}

export function RegistrationStatus() {
  const available = isRegistrationAvailable();

  if (available) {
    return (
      <a 
        href={REGISTRATION_URL} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-primary underline"
        data-testid="link-register-external"
      >
        Click here to register
      </a>
    );
  }

  return (
    <p className="text-muted-foreground italic" data-testid="text-registration-pending">
      Registration link will be published soon.
    </p>
  );
}
