using System.Collections.Concurrent;
using KataryApi.Models;

namespace KataryApi.Data;

// Almacén en memoria: se reinicia cada vez que corres la API.
// Reto para casa: reemplázalo por una base de datos con Entity Framework Core.
public class ItemStore
{
    private readonly ConcurrentDictionary<int, Item> _items = new();
    private int _nextId;

    public ItemStore()
    {
        // 👉 PASO .NET: reemplaza estos datos de ejemplo por los de TU idea.
        Seed(new Item(0, "Full Body Iniciación", "Rutina de cuerpo completo 3 días/semana para aprender patrones básicos.", "Fuerza", 25000, "principiante"));
        Seed(new Item(0, "Cardio Suave 20 min", "Caminata/elíptica a ritmo conversacional para activar sistema cardiovascular.", "Cardio", 15000, "principiante"));
        Seed(new Item(0, "Yoga Básico 30 min", "Posturas fundamentales y respiración para movilidad y relajación.", "Yoga", 20000, "principiante"));
        Seed(new Item(0, "Upper/Lower Intermedio", "Split 4 días con progresión de cargas: torso/pierna.", "Fuerza", 35000, "intermedio"));
        Seed(new Item(0, "HIIT Avanzado 25 min", "Intervalos de alta intensidad para quemar grasa y mejorar VO2 máx.", "Cardio", 30000, "avanzado"));
    }

    public IEnumerable<Item> GetAll() => _items.Values.OrderBy(i => i.Id);

    public Item? Get(int id) => _items.GetValueOrDefault(id);

    public Item Add(Item item)
    {
        var created = item with { Id = Interlocked.Increment(ref _nextId) };
        _items[created.Id] = created;
        return created;
    }

    public bool Remove(int id) => _items.TryRemove(id, out _);

    private void Seed(Item item) => Add(item);
}
