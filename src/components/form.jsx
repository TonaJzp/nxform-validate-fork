'use client'
import { realAction } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { CircleAlert, RefreshCcw } from 'lucide-react'
import { toast } from "sonner";

function Formulario() {

    const [state, action, pending] = useActionState(realAction, {})

    useEffect(() => {
        if (state.error) toast.error(state.error)
        if (state.success) toast.success(state.success)
    }, [state])

    return (
        <form action={action} noValidate className="my-20 border-2 p-4 flex flex-col gap-2">
            <h1 className="text-center text-xl">Formulario</h1>

            {/* ================= NOMBRE ================= */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="nombre">Nombre:</label>

                {/* ANTES:
                <input id="nombre" name="nombre" className="ring-2"
                    // pattern="[A-Za-zÑñÁÉÍÓÚáéíóú]{1,5}"
                    // title="Mínimo 1 letra, máximo 5 letras"
                    defaultValue={state.payload?.get("nombre") || ""}  // para recuperar el valor introducido previamente
                />
                */}

                {/* AHORA: validación en cliente con nuevas reglas */}
                <input
                    id="nombre"
                    name="nombre"
                    className="ring-2"
                    pattern="[A-Za-zÑñÁÉÍÓÚáéíóú]{2,8}"   // antes 1-5 letras, ahora 2-8
                    title="Solo letras, mínimo 2 y máximo 8" // mensaje actualizado
                    required                                // ahora el nombre es obligatorio
                    defaultValue={state.payload?.get("nombre") || ""}
                />
            </div>

            {state.issues?.nombre &&
                <div className="text-sm font-medium text-red-600 bg-red-50 rounded-md flex items-center border">
                    <CircleAlert className="inline m-2 size-4" /> {state.issues.nombre}
                </div>
            }

            {/* ================= EDAD ================= */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="edad">Edad:</label>

                {/* ANTES:
                <input type='number' id="edad" name="edad" className="ring-2"
                    defaultValue={state.payload?.get("edad") || ""}  // para recuperar el valor introducido previamente
                    // min={18} max={65}
                />
                */}

                {/* AHORA: edad entre 21 y 60 y obligatoria */}
                <input
                    type="number"
                    id="edad"
                    name="edad"
                    className="ring-2"
                    min={21}   // antes 18
                    max={60}   // antes 65
                    required   // ahora es obligatoria
                    defaultValue={state.payload?.get("edad") || ""}
                />
            </div>

            {state.issues?.edad &&
                <div className="text-sm font-medium text-red-600 bg-red-50 rounded-md flex items-center border">
                    <CircleAlert className="inline m-2 size-4" /> {state.issues.edad}
                </div>
            }

            {/* ================= EMAIL ================= */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="email">Email:</label>

                {/* ANTES:
                <input type='email' id="email" name="email" className="ring-2"
                    defaultValue={state.payload?.get("email") || ""}  // para recuperar el valor introducido previamente
                />
                */}

                {/* AHORA: email sigue siendo type="email" pero ahora es obligatorio */}
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="ring-2"
                    required    // antes no era obligatorio
                    defaultValue={state.payload?.get("email") || ""}
                />
            </div>
            {state.issues?.email && state.issues.email}

            {/* ================= TELÉFONO ================= */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="telefono">Teléfono móvil:</label>

                {/* ANTES:
                <input type='tel' id="telefono" name="telefono" className="ring-2"
                    defaultValue={state.payload?.get("telefono") || ""}  // para recuperar el valor introducido previamente
                    // pattern="[678]{1}[0-9]{8}"
                    // title="9 dígitos, siendo el primero 6,7 u 8"
                />
                */}

                {/* AHORA: mismo patrón pero activo y obligatorio */}
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="ring-2"
                    pattern="[678][0-9]{8}"                 // 9 dígitos empezando por 6, 7 u 8
                    title="9 dígitos, empezando por 6, 7 u 8"
                    required                                // ahora es obligatorio
                    defaultValue={state.payload?.get("telefono") || ""}
                />
            </div>
            {state.issues?.telefono && state.issues.telefono}

            {/* ================= FECHA ================= */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="fecha">Fecha de incidencia:</label>

                {/* ANTES:
                <input type="date" id="fecha" name="fecha" className="ring-2"
                    defaultValue={state.payload?.get("fecha") || new Date().toISOString().split('T')[0]}  // para recuperar el valor introducido previamente
                    // min="2024-01-01" max="2024-12-31"
                />
                */}

                {/* AHORA: rango de fechas cambiado y obligatorio */}
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    className="ring-2"
                    min="2024-05-01"  // antes 2024-01-01
                    max="2024-10-31"  // antes 2024-12-31
                    required          // ahora es obligatoria
                    defaultValue={state.payload?.get("fecha") || "2024-05-01"}
                />
            </div>
            {state.issues?.fecha && state.issues.fecha}

            {/* ================= COMENTARIO ================= */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="comentario">Comentario:</label>

                {/* ANTES:
                <textarea id="comentario" name="comentario" className="ring-2"
                    defaultValue={state.payload?.get("comentario") || ""}  // para recuperar el valor introducido previamente
                />
                */}

                {/* AHORA: comentario obligatorio y con límites de longitud */}
                <textarea
                    id="comentario"
                    name="comentario"
                    className="ring-2"
                    minLength={10}   // mínimo 10 caracteres
                    maxLength={200}  // máximo 200
                    required         // ahora es obligatorio
                    defaultValue={state.payload?.get("comentario") || ""}
                />
            </div>
            {state.issues?.comentario && state.issues.comentario}

            {/* ================= BOTÓN ================= */}
            <button
                disabled={pending}
                className="disabled:bg-slate-600 bg-blue-600 text-white rounded-lg py-2"
            >
                {pending ? <RefreshCcw className="inline animate-spin size-4" /> : 'Insertar'}
            </button>

        </form>
    );
}

export default Formulario;
