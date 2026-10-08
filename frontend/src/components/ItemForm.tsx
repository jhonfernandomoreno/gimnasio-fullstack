import { useState, type FormEvent } from "react";
import { api } from "../api";
import type { NewItem } from "../types";

const levels = ["principiante", "intermedio", "avanzado"] as const;
const empty: NewItem = { name: "", description: "", category: "", price: 0, level: "principiante" };

export function ItemForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState<NewItem>(empty);
  const [saving, setSaving] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.createItem(form);
      setForm(empty);
      onCreated();
    } catch (err) {
      alert(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h3>Agregar rutina/clase</h3>
      <input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Categoría (ej: Fuerza, Cardio, Yoga)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <textarea placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input
        type="number"
        placeholder="Precio"
        value={form.price || ""}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />
      <select
        value={form.level}
        onChange={(e) => setForm({ ...form, level: e.target.value })}
      >
        {levels.map((l) => (
          <option key={l} value={l}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </option>
        ))}
      </select>
      <button className="primary" disabled={saving}>
        {saving ? "Guardando…" : "Guardar"}
      </button>
    </form>
  );
}
