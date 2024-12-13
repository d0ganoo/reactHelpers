# Guide complet sur `useMemo` en React

## Qu'est-ce que `useMemo` ?

`useMemo` est un hook de React qui permet de mémoriser une valeur calculée afin d'optimiser les performances d'une application. Il prend une fonction de calcul et une liste de dépendances, et retourne la valeur mise en cache tant que les dépendances n'ont pas changé.

**Syntaxe :**
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### Utilité principale
`useMemo` est particulièrement utile lorsque :
1. Vous avez une opération coûteuse en termes de calcul.
2. Vous souhaitez éviter que cette opération soit recalculée inutilement à chaque rendu.

### Arguments
1. **Fonction de calcul** : Une fonction qui calcule et retourne la valeur à mémoriser.
2. **Dépendances** : Un tableau des valeurs qui, lorsqu'elles changent, entraînent le recalcul de la fonction de calcul.

### Retourne
La valeur mémorisée, qui est recalculée uniquement lorsque l'une des dépendances change.

---

## Bonnes pratiques

### Exemple 1 : Optimisation d'un calcul lourd
Si vous effectuez un calcul complexe basé sur des données de votre composant :

```javascript
import React, { useMemo } from 'react';

function ExpensiveCalculationComponent({ numbers }) {
  const sum = useMemo(() => {
    console.log('Calcul en cours...');
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return <div>Somme : {sum}</div>;
}

export default ExpensiveCalculationComponent;
```
**Pourquoi cela fonctionne :**
- Le calcul n'est effectué que lorsque la liste `numbers` change.
- Si les `numbers` ne changent pas, la valeur de `sum` est directement réutilisée.

### Exemple 2 : Optimisation d'une liste filtrée
Pour éviter de recalculer une liste filtrée à chaque rendu :

```javascript
import React, { useMemo } from 'react';

function FilteredList({ items, searchTerm }) {
  const filteredItems = useMemo(() => {
    console.log('Filtrage en cours...');
    return items.filter(item => item.includes(searchTerm));
  }, [items, searchTerm]);

  return (
    <ul>
      {filteredItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default FilteredList;
```
**Pourquoi cela fonctionne :**
- Le filtrage est recalculé uniquement si `items` ou `searchTerm` changent.
- Réduit les calculs inutiles si aucune de ces dépendances ne change.

---

## Mauvaises pratiques

### Exemple 1 : Utilisation inutile de `useMemo`

```javascript
import React, { useMemo } from 'react';

function UnnecessaryUseMemo({ number }) {
  const squared = useMemo(() => number * number, [number]);

  return <div>Le carré est : {squared}</div>;
}

export default UnnecessaryUseMemo;
```
**Problème :**
- Le calcul `number * number` est trivial et n'a pas besoin d'être mémorisé.
- Utiliser `useMemo` ici complique le code sans bénéfice réel.

### Exemple 2 : Mauvaise gestion des dépendances

```javascript
import React, { useMemo } from 'react';

function IncorrectDependencies({ items }) {
  const sortedItems = useMemo(() => {
    console.log('Tri en cours...');
    return [...items].sort();
  }, []); // Mauvaise dépendance !

  return (
    <ul>
      {sortedItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default IncorrectDependencies;
```
**Problème :**
- Le tableau des dépendances est vide (`[]`), ce qui signifie que le tri est effectué une seule fois.
- Si `items` change, le tri ne sera pas refait, entraînant des bugs potentiels.

---

## Points clés à retenir
- **N'utilisez pas `useMemo` pour optimiser prématurément**. Si le calcul est rapide, il n'est pas nécessaire de l'optimiser.
- **Déclarez correctement les dépendances**. Une mauvaise gestion des dépendances peut entraîner des bugs difficiles à détecter.
- **Testez les performances avant d'ajouter `useMemo`**. Si l'optimisation n'est pas nécessaire, cela peut ajouter une complexité inutile.

---

En résumé, `useMemo` est un outil puissant lorsqu'il est utilisé correctement, mais il peut rapidement devenir contre-productif s'il est mal utilisé.

