'use server'

import { z } from "zod";

// Esquema de validación en el SERVIDOR
const schema = z.object({
  id: z.union([z.coerce.number(), z.string().nullish()]),

  // ========= NOMBRE =========
  /* ANTES:
  nombre: z.string().trim()
      .min(1, "Al menos debe tener una letra")
      .max(5, "Como máximo debe haber 5 letras"),
  */

  // AHORA: mínimo 2 letras, máximo 8, solo letras (igual que el pattern del cliente)
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 letras")
    .max(8, "El nombre no puede tener más de 8 letras")
    .regex(
      /^[A-Za-zÑñÁÉÍÓÚáéíóú]+$/,
      "El nombre solo puede contener letras"
    ),

  // ========= EDAD =========
  /* ANTES:
  edad: z.coerce.number()
      .min(18, "La edad mínima debe ser 18 años")
      .max(65, "La edad máxima debe ser 65 años"),
  */

  // AHORA: entre 21 y 60, número entero (coincide con min/max del input number)
  edad: z.coerce
    .number()
    .int("La edad debe ser un número entero")
    .min(21, "La edad mínima debe ser 21 años")
    .max(60, "La edad máxima debe ser 60 años"),

  // ========= TELÉFONO =========
  /* ANTES:
  telefono: z.string().trim()
      .regex(/[678]{1}[0-9]{8}/, "Escribe 9 dígitos, siendo el primero 6,7 u 8"),
  */

  // AHORA: exactamente 9 dígitos, empezando por 6, 7 u 8 (mismo patrón que en el cliente)
  telefono: z
    .string()
    .trim()
    .regex(
      /^[678][0-9]{8}$/,
      "Escribe 9 dígitos, empezando por 6, 7 u 8"
    ),

  // ========= EMAIL =========
  // ANTES y AHORA: igual, valida formato de email. En el servidor también actúa como obligatorio.
  email: z.string().email({ message: "Email no válido" }),

  // ========= FECHA =========
  /* ANTES:
  fecha: z.coerce.date()
      .min(new Date("2024-01-01"), "La fecha debe estar dentro del año 2024")
      .max(new Date("2024-12-31"), "La fecha debe estar dentro del año 2024"),
  */

  // AHORA: entre 01/05/2024 y 31/10/2024 (igual que min/max del input date)
  fecha: z.coerce
    .date()
    .min(
      new Date("2024-05-01"),
      "La fecha debe estar entre el 01/05/2024 y el 31/10/2024"
    )
    .max(
      new Date("2024-10-31"),
      "La fecha debe estar entre el 01/05/2024 y el 31/10/2024"
    ),

  // ========= COMENTARIO =========
  /* ANTES:
  comentario: z.string().optional()
  */

  // AHORA: obligatorio, entre 10 y 200 caracteres (igual que minLength/maxLength del textarea)
  comentario: z
    .string()
    .trim()
    .min(10, "El comentario debe tener al menos 10 caracteres")
    .max(200, "El comentario no puede superar los 200 caracteres"),
});

function validate(formData) {
  const datos = Object.fromEntries(formData.entries());

  const result = schema.safeParse(datos);
  return result;
  // https://zod.dev/ERROR_HANDLING?id=zodparsedtype
  // result puede ser de 2 tipos:
  // { success: true, data: z.infer<typeof schema> }
  // { success: false, error: issues[] }
}

// How to (not) reset a form after a Server Action in React:
// https://www.robinwieruch.de/react-server-action-reset-form/
export async function realAction(prevState, formData) {

  const result = validate(formData);
  if (!result.success) {
    console.log('issues (en crudo) ', result.error.issues);
    const simplified = result.error.issues.map(issue => [issue.path[0], issue.message]);
    const issues = Object.fromEntries(simplified);
    console.log('issues (cocinados) ', issues);
    return { issues, payload: formData };
  }

  try {
    // Hacemos algo (guardar en BD, enviar a API, ...) con
    // result.data
    console.log('result.data ', result.data);
    return { success: 'Éxito al realizar acción' };
  } catch (error) {
    console.log("Error:", error);
    return { error };
  }
}
