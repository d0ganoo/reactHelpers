# Utilisation de `useMemo` en React

`useMemo` est un hook de React qui permet de mémoriser des valeurs calculées entre les rendus pour éviter des recalculs coûteux. Cependant, il doit être utilisé judicieusement pour éviter des complexités inutiles et des coûts de performance.

## Quand utiliser `useMemo`

1. **Calculs coûteux** :
   - Utilise `useMemo` pour mémoriser des valeurs calculées qui sont coûteuses en termes de performance.
   - Exemple : Calculs complexes, transformations de données, etc.

2. **Valeurs dérivées** :
   - Utilise `useMemo` pour mémoriser des valeurs dérivées qui dépendent de plusieurs états ou props.
   - Exemple : Calcul d'une somme à partir d'une liste de nombres.

3. **Optimisation des rendus** :
   - Utilise `useMemo` pour éviter des rendus inutiles en mémorisant des valeurs qui ne changent pas souvent.
   - Exemple : Mémoriser une liste filtrée ou triée.

### Exemple d'utilisation appropriée de `useMemo`



```jsx
import React, { useMemo, useState } from 'react';

const expensiveCalculation = (num) => {
  console.log('Calculating...');
  let result = 0;
  for (let i = 0; i < 1e6; i++) {
    result += num;
  }
  return result;
};

const MemoizedComponent = ({ num }) => {
  const memoizedValue = useMemo(() => expensiveCalculation(num), [num]);

  return <div>Memoized Value: {memoizedValue}</div>;
};

```
### Quand ne pas utiliser `useMemo`

### Calculs simples :

Évite d'utiliser `useMemo` pour des calculs simples qui ne sont pas coûteux en termes de performance.
Exemple : Addition de deux nombres.

### Valeurs fréquemment mises à jour :

Évite d'utiliser `useMemo` pour des valeurs qui changent fréquemment, car cela peut introduire une complexité inutile.
Exemple : Valeurs dérivées de l'état local qui changent à chaque rendu.

### Valeurs primitives :

Évite d'utiliser `useMemo` pour des valeurs primitives (comme des nombres ou des chaînes de caractères) qui ne nécessitent pas de mémorisation.
Exemple : Mémoriser une simple chaîne de caractères.

### Exemple d'utilisation inappropriée de `useMemo`

```jsx
import React, { useMemo, useState } from 'react';

const SimpleComponent = ({ num }) => {
  const simpleValue = useMemo(() => num + 1, [num]); // Calcul simple

  return <div>Simple Value: {simpleValue}</div>;
};
