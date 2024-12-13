# Guide complet sur les hooks personnalisés en React

## Qu'est-ce qu'un hook personnalisé ?

Un hook personnalisé (ou *custom hook*) est une fonction JavaScript qui commence par `use` et qui encapsule une logique réutilisable basée sur des hooks React comme `useState`, `useEffect`, ou autres. Les hooks personnalisés permettent de simplifier et de factoriser le code, en partageant des comportements complexes entre différents composants.

**Syntaxe de base :**
```javascript
const useCustomHook = () => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Logique réutilisable
  }, [state]);

  return [state, setState];
}
```

---

## Pourquoi créer un hook personnalisé ?

- Réutiliser des comportements complexes entre composants.
- Rendre le code plus lisible et mieux organisé.
- Centraliser la logique pour faciliter la maintenance.

---

## Bonnes pratiques

### Exemple 1 : Gestion de la fenêtre (taille de l'écran)

Un hook personnalisé qui permet de surveiller la taille de la fenêtre :

```javascript
import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default useWindowSize;
```
**Utilisation :**
```javascript
import React from 'react';
import useWindowSize from './useWindowSize';

function App() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Largeur : {width}</p>
      <p>Hauteur : {height}</p>
    </div>
  );
}

export default App;
```
**Pourquoi cela fonctionne :**
- La logique de gestion de l'événement `resize` est encapsulée et réutilisable.
- Le composant `App` reste clair et concis.

### Exemple 2 : Gestion d'une requête API avec des effets secondaires

Un hook personnalisé pour récupérer des données à partir d'une API :

```javascript
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) setData(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => (isMounted = false);
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```
**Utilisation :**
```javascript
import React from 'react';
import useFetch from './useFetch';

function DataDisplay({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export default DataDisplay;
```
**Pourquoi cela fonctionne :**
- La logique de récupération de données est réutilisable.
- Les états `loading` et `error` sont bien encapsulés.

---

## Mauvaises pratiques

### Exemple 1 : Ne pas respecter la convention `use`

```javascript
function customHook() {
  const [state, setState] = useState(0);
  return [state, setState];
}

export default customHook;
```
**Problème :**
- La fonction ne commence pas par `use`, ce qui peut causer des problèmes dans l'outil React DevTools ou dans des vérifications automatiques.

### Exemple 2 : Utiliser un hook personnalisé pour une logique triviale

```javascript
import { useState } from 'react';

function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}

export default useCounter;
```
**Problème :**
- Ce hook encapsule une logique simple qui pourrait être facilement implémentée directement dans un composant.
- Introduit une abstraction inutile.

---

## Points clés à retenir
- **Respectez la convention de nommage `use`.** Tous les hooks personnalisés doivent commencer par `use`.
- **Identifiez les cas d'usage réels.** Créez des hooks personnalisés uniquement lorsque la logique est réutilisable ou complexe.
- **Testez vos hooks.** Assurez-vous que vos hooks fonctionnent comme prévu et qu'ils gèrent correctement les effets secondaires et les dépendances.

---

En résumé, les hooks personnalisés sont un outil puissant pour structurer et réutiliser la logique complexe dans vos applications React. Cependant, leur utilisation doit être justifiée pour éviter une abstraction inutile.

