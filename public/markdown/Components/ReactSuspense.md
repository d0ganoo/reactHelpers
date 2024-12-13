# Cours sur React Suspense

## Introduction

**React Suspense** est une fonctionnalité fournie par React pour gérer les états de chargement dans les applications React. Suspense simplifie la gestion des composants asynchrones, comme le chargement de données ou le rendu conditionnel.

React Suspense est conçu pour travailler avec **les ressources asynchrones** (comme les données provenant d'une API) et **les composants React** pour offrir une expérience utilisateur fluide.

---

## Prérequis

Pour utiliser **React Suspense**, vous devez avoir :

- Une version de **React 16.6+** pour les fonctionnalités de base.
- Une compréhension des **composants fonctionnels** et des **hooks**.
- **React 18+** pour l'intégration avec des bibliothèques comme `React.lazy`, les **Suspense Data Fetching** et les fonctionnalités plus avancées.

---

## 1. Utilisation de `React.Suspense`

### Objectif
Afficher un état de chargement pendant le rendu d'un composant asynchrone.

### Exemple avec `React.lazy`

```jsx
import React, { Suspense, lazy } from 'react';

// Chargement du composant en lazy loading
const MyComponent = lazy(() => import('./MyComponent'));

function App() {
  return (
    <div>
      <h1>React Suspense avec Lazy Loading</h1>
      <Suspense fallback={<p>Chargement en cours...</p>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

### Explications
- **`React.lazy`** permet de charger des composants de façon asynchrone.
- **`Suspense`** affiche un composant de secours (défini par `fallback`) pendant que le composant asynchrone se charge.
- Ici, `MyComponent` sera chargé uniquement lorsque nécessaire.

---

## 2. Gestion des données asynchrones avec Suspense

React Suspense peut être utilisé avec des bibliothèques pour le **data fetching**, comme **React Query** ou des solutions expérimentales de React.

### Exemple avec React Query

Pour intégrer **Suspense** avec React Query :

1. Activez **Suspense** dans le `QueryClient` :

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
}
```

2. Utilisez **Suspense** dans vos composants :

```jsx
import { useQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';

function FetchTodos() {
  const { data } = useQuery(['todos'], fetchTodos);
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

const fetchTodos = async () => {
  const res = await fetch('/api/todos');
  return res.json();
};

function App() {
  return (
    <Suspense fallback={<p>Chargement des données...</p>}>
      <FetchTodos />
    </Suspense>
  );
}

export default App;
```

### Explications
- **Suspense** gère l'affichage pendant que `useQuery` récupère les données.
- Le `fallback` est affiché tant que les données ne sont pas chargées.
- Cela offre une meilleure gestion des états de chargement.

---

## 3. Utilisation avancée de Suspense

### Composants avec plusieurs Suspense
Vous pouvez combiner plusieurs **Suspense** dans une même application.

```jsx
import React, { Suspense, lazy } from 'react';

const ComponentA = lazy(() => import('./ComponentA'));
const ComponentB = lazy(() => import('./ComponentB'));

function App() {
  return (
    <div>
      <h1>Exemple avec plusieurs Suspense</h1>
      <Suspense fallback={<p>Chargement de ComponentA...</p>}>
        <ComponentA />
      </Suspense>
      <Suspense fallback={<p>Chargement de ComponentB...</p>}>
        <ComponentB />
      </Suspense>
    </div>
  );
}

export default App;
```

### Explications
- Chaque **Suspense** peut avoir son propre `fallback`.
- Cela permet d’afficher des états de chargement indépendants pour chaque composant.

---

## 4. Erreurs avec React Suspense

React Suspense ne gère pas directement les erreurs lors du chargement de composants. Pour cela, vous devez utiliser **Error Boundaries**.

### Exemple avec Error Boundary

```jsx
import React, { Suspense, lazy } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Une erreur est survenue.</h1>;
    }
    return this.props.children;
  }
}

const MyComponent = lazy(() => import('./MyComponent'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Chargement...</p>}>
        <MyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
```

### Explications
- **ErrorBoundary** attrape les erreurs pendant le rendu d’un composant asynchrone.
- Cela évite un crash complet de l'application.

---

## Conclusion

### Points clés

1. **Suspense** simplifie la gestion des états de chargement.
2. Il fonctionne avec :
   - `React.lazy` pour le chargement asynchrone des composants.
   - Des bibliothèques comme **React Query** pour le chargement de données.
3. Combinez **Suspense** avec des **Error Boundaries** pour gérer les erreurs.

### Avantages
- Un rendu fluide avec des composants de secours.
- Une meilleure expérience utilisateur.
- Simplification du code pour gérer les chargements.

