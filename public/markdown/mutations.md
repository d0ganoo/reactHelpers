# Cours sur les mutations GET, POST, PUT, DELETE avec React Query

## Introduction

**React Query** est une bibliothèque utilisée dans les applications React pour gérer les états asynchrones, les requêtes réseau et le cache des données. Elle offre une solution efficace pour effectuer des requêtes et manipuler des données en provenance d'une API REST.

Les deux principales fonctionnalités de React Query sont :

1. **`useQuery`** : pour récupérer des données (**GET**).
2. **`useMutation`** : pour modifier des données (**POST**, **PUT**, **DELETE**).

Ce cours se concentre sur l'utilisation des **mutations** pour les requêtes POST, PUT et DELETE.

---

## Prérequis

### Installation de React Query

```bash
npm install @tanstack/react-query
```

### Configuration de React Query

Ajoutez le `QueryClient` et le `QueryClientProvider` pour initialiser React Query dans votre application :

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Vos composants */}
    </QueryClientProvider>
  );
}

export default App;
```

---

## 1. Requête GET avec `useQuery`

Même si les mutations concernent **POST**, **PUT** et **DELETE**, il est utile de comprendre comment récupérer des données avec **GET**.

### Exemple de récupération des données :

```jsx
import { useQuery } from '@tanstack/react-query';

function TodoList() {
  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    if (!response.ok) throw new Error('Erreur de récupération');
    return response.json();
  };

  const { data, isLoading, error } = useQuery(['todos'], fetchTodos);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

### Explication :
- **`useQuery`** est utilisé pour exécuter une requête GET.
- Le paramètre `['todos']` est une clé unique pour identifier la requête dans le cache.
- **`fetchTodos`** est une fonction qui retourne les données de l'API.

---

## 2. Requête POST avec `useMutation`

### Objectif :
Ajouter une nouvelle ressource dans l'API.

### Exemple d'ajout d'un TODO :

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddTodo() {
  const queryClient = useQueryClient();

  const addTodo = async (newTodo) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'ajout');
    return response.json();
  };

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']); // Rafraîchit les données
    },
  });

  const handleAdd = () => {
    mutation.mutate({ title: 'Nouveau TODO' });
  };

  return (
    <div>
      <button onClick={handleAdd} disabled={mutation.isLoading}>
        Ajouter un TODO
      </button>
      {mutation.isLoading && <p>Ajout en cours...</p>}
      {mutation.error && <p>Erreur : {mutation.error.message}</p>}
    </div>
  );
}
```

### Explication :
- **`useMutation`** est utilisé pour envoyer une requête POST.
- **`mutation.mutate()`** déclenche l'ajout des données.
- **`onSuccess`** permet d'invalider le cache pour rafraîchir les données existantes.

---

## 3. Requête PUT avec `useMutation`

### Objectif :
Mettre à jour une ressource existante.

### Exemple de mise à jour d'un TODO :

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function UpdateTodo() {
  const queryClient = useQueryClient();

  const updateTodo = async (updatedTodo) => {
    const response = await fetch(`/api/todos/${updatedTodo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  };

  const mutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleUpdate = () => {
    mutation.mutate({ id: 1, title: 'TODO mis à jour' });
  };

  return (
    <button onClick={handleUpdate} disabled={mutation.isLoading}>
      Mettre à jour le TODO
    </button>
  );
}
```

### Explication :
- La méthode **PUT** est utilisée pour mettre à jour la ressource existante.
- Le cache est invalidé après la réussite de la mutation pour synchroniser les données.

---

## 4. Requête DELETE avec `useMutation`

### Objectif :
Supprimer une ressource existante.

### Exemple de suppression d'un TODO :

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function DeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodo = async (id) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  };

  const mutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <button onClick={() => handleDelete(1)} disabled={mutation.isLoading}>
      Supprimer le TODO
    </button>
  );
}
```

### Explication :
- La méthode **DELETE** est utilisée pour supprimer une ressource.
- La mutation prend l'`id` de la ressource comme paramètre.

---

## Conclusion

### Récapitulatif des opérations

| **Méthode** | **Hook**        | **Objectif**                          |
|-------------|-----------------|---------------------------------------|
| GET         | `useQuery`      | Récupérer des données                 |
| POST        | `useMutation`   | Ajouter une nouvelle ressource        |
| PUT         | `useMutation`   | Mettre à jour une ressource existante |
| DELETE      | `useMutation`   | Supprimer une ressource existante     |

### Points clés
- **React Query** simplifie les requêtes et la gestion du cache.
- **`useMutation`** est idéal pour les opérations **POST**, **PUT** et **DELETE**.
- Le **cache** est automatiquement mis à jour avec `invalidateQueries`.

---