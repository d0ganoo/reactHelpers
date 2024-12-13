# Guide complet sur `useCallback` en React

## Qu'est-ce que `useCallback` ?

`useCallback` est un hook de React qui permet de mémoriser une fonction. Il renvoie une version mémoïsée d'une fonction qui ne change que si ses dépendances changent.

**Syntaxe :**
```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Utilité principale
`useCallback` est utile pour éviter de recréer des fonctions à chaque rendu, ce qui peut être important dans les cas suivants :
1. Vous passez une fonction en prop à un composant enfant optimisé avec `React.memo`.
2. Vous avez des fonctions dans une liste de dépendances d'un autre hook (par exemple `useEffect`).

### Arguments
1. **Fonction** : La fonction à mémoïser.
2. **Dépendances** : Un tableau des valeurs dont dépend la fonction. La fonction sera recréée uniquement lorsque l'une de ces dépendances change.

### Retourne
La version mémoïsée de la fonction.

---

## Bonnes pratiques

### Exemple 1 : Passer une fonction mémoïsée à un composant enfant
Si vous avez un composant enfant optimisé avec `React.memo` :

```javascript
import React, { useCallback, useState } from 'react';

const ChildComponent = React.memo(({ onClick }) => {
  console.log("Render ChildComponent");
  return <button onClick={onClick}>Cliquez-moi</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Bouton cliqué !");
  }, []);

  return (
    <div>
      <h1>Compteur : {count}</h1>
      <button onClick={() => setCount(count + 1)}>Incrémenter</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

export default ParentComponent;
```
**Pourquoi cela fonctionne :**
- `handleClick` est recréé uniquement si ses dépendances changent (aucune dépendance ici).
- Cela empêche `ChildComponent` de se re-rendre inutilement.

### Exemple 2 : Utilisation dans une liste de dépendances
Lorsqu'une fonction est utilisée dans un `useEffect` :

```javascript
import React, { useCallback, useEffect, useState } from 'react';

function FetchDataComponent({ url }) {
  const [data, setData] = useState(null);

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Chargement..."}
    </div>
  );
}

export default FetchDataComponent;
```
**Pourquoi cela fonctionne :**
- `fetchData` est stable et ne change que si `url` change.
- Évite une boucle infinie dans `useEffect`.

---

## Mauvaises pratiques

### Exemple 1 : Utilisation inutile de `useCallback`

```javascript
import React, { useCallback } from 'react';

function UnnecessaryUseCallback({ value }) {
  const calculateSquare = useCallback(() => {
    return value * value;
  }, [value]);

  return <div>Le carré est : {calculateSquare()}</div>;
}

export default UnnecessaryUseCallback;
```
**Problème :**
- `calculateSquare` est appelé immédiatement dans le rendu.
- Cela annule les bénéfices de `useCallback`, car la fonction est toujours recréée.
- Une simple fonction normale aurait suffi.

### Exemple 2 : Mauvaise gestion des dépendances

```javascript
import React, { useCallback, useState } from 'react';

function IncorrectDependencies() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, []); // Mauvaise dépendance !

  return (
    <div>
      <h1>Compteur : {count}</h1>
      <button onClick={increment}>Incrémenter</button>
    </div>
  );
}

export default IncorrectDependencies;
```
**Problème :**
- `count` n'est pas inclus dans les dépendances.
- La fonction utilise une ancienne valeur de `count`, ce qui cause des comportements inattendus.

---

## Points clés à retenir
- **N'utilisez pas `useCallback` pour optimiser prématurément.** Si la fonction n'est pas transmise comme prop ou utilisée comme dépendance, ce n'est pas nécessaire.
- **Déclarez correctement les dépendances.** Oublier une dépendance peut entraîner des bugs subtils.
- **Utilisez-le en complément de `React.memo` et des hooks comme `useEffect`.**

---

En résumé, `useCallback` est un outil efficace pour optimiser vos composants, mais il doit être utilisé avec parcimonie et de manière appropriée.

