/**
 * Field-level validators for the checkout form. Each returns either null
 * (valid) or a short Italian error message suitable for display below the
 * field.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const IT_CAP_RE = /^\d{5}$/;
const PHONE_RE = /^[+\d][\d\s().-]{6,}$/;
const NAME_RE = /^[\p{L}''\-\s]{2,}$/u;

export type FieldErrors = Partial<Record<
  "email" | "firstName" | "lastName" | "address" | "city" | "zip" | "country" | "phone",
  string
>>;

export function validateCheckout(input: {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone?: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!EMAIL_RE.test(input.email.trim())) {
    errors.email = "Email non valida";
  }
  if (!NAME_RE.test(input.firstName.trim())) {
    errors.firstName = "Inserisci il tuo nome";
  }
  if (!NAME_RE.test(input.lastName.trim())) {
    errors.lastName = "Inserisci il tuo cognome";
  }
  if (input.address.trim().length < 5) {
    errors.address = "Indirizzo troppo corto";
  }
  if (input.city.trim().length < 2) {
    errors.city = "Città richiesta";
  }
  // Italy uses a 5-digit CAP. Other countries accept alphanumeric 3-10.
  if (input.country === "Italia") {
    if (!IT_CAP_RE.test(input.zip.trim())) {
      errors.zip = "CAP italiano a 5 cifre";
    }
  } else if (input.zip.trim().length < 3) {
    errors.zip = "Codice postale non valido";
  }
  if (input.country.trim().length < 2) {
    errors.country = "Paese richiesto";
  }
  if (input.phone && input.phone.trim() && !PHONE_RE.test(input.phone.trim())) {
    errors.phone = "Numero di telefono non valido";
  }

  return errors;
}