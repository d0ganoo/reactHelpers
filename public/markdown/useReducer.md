# Guide complet sur `useReducer` en React

## Qu'est-ce que `useReducer` ?

`useReducer` est un hook de React qui permet de gérer des états complexes dans un composant. Il est particulièrement utile lorsque l'état d'un composant dépend de plusieurs actions ou lorsqu'il évolue de manière non triviale.

**Syntaxe :**
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

### Arguments
1. **`reducer`** : Une fonction qui détermine comment l'état doit changer en fonction de l'action dispatchée.
   ```javascript
   const reducer = (state, action) => {
     switch (action.type) {
       case 'increment':
         return { count: state.count + 1 };
       case 'decrement':
         return { count: state.count - 1 };
       default:
         return state;
     }
   };
   ```
2. **`initialState`** : La valeur initiale de l'état.

### Retourne
1. **`state`** : L'état actuel.
2. **`dispatch`** : Une fonction pour envoyer des actions qui modifient l'état.

---

## Bonnes pratiques

### Exemple 1 : Compteur avec `useReducer`

Un exemple basique d'un compteur utilisant `useReducer` :

```javascript
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error('Action non reconnue');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Compteur : {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Incrémenter</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Décrémenter</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Réinitialiser</button>
    </div>
  );
}

export default Counter;
```
**Pourquoi cela fonctionne :**
- `reducer` gère plusieurs types d'actions.
- `dispatch` permet de déclencher les changements d'état.

### Exemple 2 : Gestion d'un formulaire complexe

Lorsqu'un formulaire contient plusieurs champs et nécessite des validations :

```javascript
import React, { useReducer } from 'react';

const initialState = {
  username: '',
  email: '',
  password: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'reset':
      return initialState;
    default:
      throw new Error('Action non reconnue');
  }
}

function RegistrationForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: 'updateField', field: e.target.name, value: e.target.value });
  };

  return (
    <form>
      <input
        name="username"
        value={state.username}
        onChange={handleChange}
        placeholder="Nom d'utilisateur"
      />
      <input
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={state.password}
        onChange={handleChange}
        placeholder="Mot de passe"
      />
      <button type="button" onClick={() => dispatch({ type: 'reset' })}>
        Réinitialiser
      </button>
      <button type="submit">Soumettre</button>
    </form>
  );
}

export default RegistrationForm;
```
**Pourquoi cela fonctionne :**
- `reducer` centralise la logique de gestion d'état du formulaire.
- Les champs du formulaire sont mis à jour dynamiquement.

---

## Mauvaises pratiques

### Exemple 1 : État simple mal géré avec `useReducer`

```javascript
import React, { useReducer } from 'react';

function Counter() {
  const [state, dispatch] = useReducer((state, action) => {
    if (action.type === 'set') {
      return action.value;
    }
    return state;
  }, 0);

  return (
    <div>
      <p>Valeur : {state}</p>
      <button onClick={() => dispatch({ type: 'set', value: state + 1 })}>Incrémenter</button>
    </div>
  );
}
```
**Problème :**
- `useReducer` est utilisé pour une logique simple qui pourrait être gérée avec `useState`.
- Complique inutilement le code.

### Exemple 2 : Mauvaise gestion des types d'action

```javascript
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  if (action.type === 'increment') {
    return { count: state.count + 1 };
  }
  // Aucune gestion du cas par défaut
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Compteur : {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Incrémenter</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Décrémenter</button>
    </div>
  );
}
```
**Problème :**
- Le cas par défaut (`default`) n'est pas géré dans le `reducer`, ce qui peut entraîner des erreurs inattendues.
- Envoie une action non prise en charge (`decrement`) qui provoquera un état non défini.

---

## Points clés à retenir
- **Utilisez `useReducer` pour des états complexes.** Si l'état est simple, préférez `useState`.
- **Toujours gérer le cas par défaut dans le `reducer`.** Cela permet d'éviter des erreurs imprévues.
- **Centralisez la logique.** `useReducer` est idéal pour organiser la gestion d'état dans des cas complexes, comme des formulaires ou des listes d'actions.

---

En résumé, `useReducer` est un outil puissant pour gérer des états complexes, mais il doit être utilisé de manière appropriée pour éviter une complexité inutile.

