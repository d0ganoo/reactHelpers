# Guide complet sur `React.memo`

## Qu'est-ce que `React.memo` ?

`React.memo` est une fonction de haut niveau (Higher Order Component - HOC) qui permet d'optimiser les performances des composants fonctionnels en évitant les rendus inutiles. Il mémorise le rendu d'un composant et ne le re-render que si ses *props* ont changé.

**Syntaxe :**
```javascript
import React from 'react';

const MyComponent = React.memo((props) => {
  return <div>{props.value}</div>;
});
```

### Utilité principale
- **Optimisation des performances** : Évite les rendus inutiles pour les composants qui ne dépendent pas de props changeantes.
- **Amélioration de l'efficacité** dans des applications complexes où les rendus fréquents peuvent ralentir l'interface utilisateur.

---

## Comment fonctionne `React.memo` ?

- `React.memo` compare les *props* de l'ancienne version et de la nouvelle version du composant.
- Si les props n'ont pas changé, le composant ne sera pas re-render.
- Par défaut, `React.memo` utilise une comparaison **shallow** (superficielle).

**Note importante :** `React.memo` ne fonctionne **que sur les props** et non sur l'état local du composant.

---

## Bonnes pratiques

### Exemple 1 : Optimisation d'un composant enfant
Lorsqu'un composant enfant reçoit des props qui ne changent pas fréquemment, utilisez `React.memo` pour éviter les rendus inutiles.

```javascript
import React, { useState } from 'react';

const ChildComponent = React.memo(({ value }) => {
  console.log('ChildComponent rendu');
  return <div>Valeur : {value}</div>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Incrémenter</button>
      <ChildComponent value={42} />
    </div>
  );
}

export default ParentComponent;
```
**Pourquoi cela fonctionne :**
- Le composant `ChildComponent` ne sera pas re-render à chaque clic, car ses props ne changent pas.
- Cela améliore les performances en évitant des calculs ou rendus inutiles.

### Exemple 2 : Utilisation avec des fonctions mémoïsées
Utiliser `React.memo` avec `useCallback` pour éviter que des fonctions inline ne causent des rendus inutiles.

```javascript
import React, { useState, useCallback } from 'react';

const Button = React.memo(({ onClick, label }) => {
  console.log('Button rendu');
  return <button onClick={onClick}>{label}</button>;
});

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Compteur : {count}</p>
      <Button onClick={handleClick} label="Incrémenter" />
    </div>
  );
}

export default App;
```
**Pourquoi cela fonctionne :**
- La fonction `handleClick` est stable grâce à `useCallback`.
- `Button` ne sera pas re-render inutilement, car ses props ne changent pas.

---

## Mauvaises pratiques

### Exemple 1 : Utilisation avec des props non stables

```javascript
import React, { useState } from 'react';

const ChildComponent = React.memo(({ value }) => {
  console.log('ChildComponent rendu');
  return <div>{value}</div>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Incrémenter</button>
      <ChildComponent value={{ number: 42 }} />
    </div>
  );
}

export default ParentComponent;
```
**Problème :**
- L'objet `{ number: 42 }` est recréé à chaque rendu du parent.
- `React.memo` ne fonctionne pas efficacement ici, car la comparaison *shallow* détecte un changement.

**Solution :** Utilisez `useMemo` pour stabiliser la valeur des props :
```javascript
const stableValue = useMemo(() => ({ number: 42 }), []);
<ChildComponent value={stableValue} />;
```

### Exemple 2 : Utilisation excessive de `React.memo`

```javascript
import React from 'react';

const StaticComponent = React.memo(() => {
  return <div>Composant statique</div>;
});

function App() {
  return (
    <div>
      <StaticComponent />
    </div>
  );
}

export default App;
```
**Problème :**
- Le composant `StaticComponent` n'a aucune prop et ne dépend d'aucun état.
- `React.memo` est inutile dans ce cas, car le composant n'est jamais re-render.

**Solution :** Ne pas utiliser `React.memo` si ce n'est pas nécessaire.

---

## Points clés à retenir

1. **Utilisez `React.memo`** pour éviter des rendus inutiles lorsque les props ne changent pas.
2. **Assurez-vous que les props sont stables**. Utilisez `useMemo` et `useCallback` pour éviter la recréation de valeurs et de fonctions.
3. **Évitez une utilisation excessive**. Ne mémorisez pas des composants statiques ou des composants qui n'ont pas de problèmes de performance.
4. **Comprenez la comparaison shallow**. Si les props sont des objets ou des tableaux, `React.memo` peut détecter un changement même si leur contenu est identique.

---

En résumé, `React.memo` est un outil puissant pour optimiser vos composants fonctionnels, mais il doit être utilisé avec précaution pour éviter une complexité inutile.

