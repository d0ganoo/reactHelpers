# Guide sur les différentes façons de faire un call API en React

## Introduction

Dans React, plusieurs approches permettent de faire un appel API pour récupérer ou envoyer des données. Ce guide explique les méthodes les plus courantes, y compris l'utilisation de `fetch`, `axios`, des hooks personnalisés, et la bibliothèque **React Query** pour une gestion optimisée des requêtes API.

---

## 1. Utilisation de `useEffect` et `fetch`

La méthode de base consiste à utiliser `fetch` avec le hook `useEffect` pour récupérer les données lorsqu'un composant est monté.

### Exemple : Récupération de données avec `fetch`

```javascript
import React, { useEffect, useState } from 'react';

function DataFetchingComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default DataFetchingComponent;
```

### Pourquoi l'utiliser ?
- Simple à mettre en œuvre.
- Directement utilisable avec `fetch` natif du navigateur.

**Inconvénient :**
- Nécessite la gestion manuelle des états `loading`, `error` et `data`.
- Pas de mise en cache automatique des requêtes.

---

## 2. Utilisation de `axios` pour une syntaxe simplifiée

`axios` est une bibliothèque populaire pour les appels HTTP en JavaScript. Elle offre une syntaxe plus simple que `fetch` et gère automatiquement les réponses JSON.

### Exemple : Récupération de données avec `axios`

```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AxiosDataFetching() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default AxiosDataFetching;
```

### Pourquoi utiliser `axios` ?
- Syntaxe plus propre pour les requêtes.
- Gestion automatique des réponses JSON.
- Support des **intercepteurs** pour transformer les requêtes/réponses.

---

## 3. Utilisation d'un hook personnalisé pour réutiliser la logique

Un hook personnalisé permet d'encapsuler la logique de récupération des données pour la rendre réutilisable dans plusieurs composants.

### Exemple : Hook personnalisé `useFetch`

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

### Utilisation du hook `useFetch`

```javascript
import React from 'react';
import useFetch from './useFetch';

function CustomHookExample() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default CustomHookExample;
```

**Avantage :** 
- Réutilisable pour plusieurs composants.
- Simplifie la gestion des états.

---

## 4. Utilisation de **React Query** pour une gestion optimisée des requêtes API

React Query est une bibliothèque puissante pour gérer les requêtes API. Elle offre des fonctionnalités comme la mise en cache, la synchronisation automatique et le pré-chargement des données.

### Exemple : Récupération de données avec React Query

Installez React Query :
```bash
npm install @tanstack/react-query
```

Configuration :
```javascript
import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function FetchPosts() {
  const { data, isLoading, error } = useQuery(['posts'], async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchPosts />
    </QueryClientProvider>
  );
}

export default App;
```

### Pourquoi utiliser React Query ?
- **Mise en cache automatique** des requêtes.
- **Synchronisation** automatique des données.
- Gestion simplifiée des états `loading` et `error`.

---

## Conclusion

- **`fetch` ou `axios`** : Pour les projets simples.
- **Hook personnalisé** : Pour réutiliser la logique des appels API.
- **React Query** : Pour des projets complexes nécessitant une mise en cache et des performances optimisées.

Choisissez la solution adaptée à la taille et aux besoins de votre projet React. 🚀

