const defaultEditorValue = `---
title: 'Dignissim dui eu, aliquet nulla'
description: 'Ac dictum ipsum posuere id. Vestibulum eu mi pulvinar, mollis nibh in, feugiat felis. Donec at augue bibendum, hendrerit mi sit amet, mattis urna.'
lang: 'fr-FR'
date: 2021-09-23
author:
  name: 'John Doe'
  contact: 'john.doe@example.com'
cover: 'https://images.unsplash.com/photo-1633887996583-d7681d6dd4ce'
---

## Titre niveau 2

Lorem ipsum dolor sit amet, [consectetur adipiscing](#) elit. Maecenas in eros interdum, dignissim dui eu, *aliquet nulla*. Quisque scelerisque justo non **rutrum pellentesque**. Donec porttitor mi et laoreet condimentum. \`Nulla nec\` magna dolor. Duis condimentum lorem ex, nec ~~euismod justo facilisis~~ vitae. Morbi metus dui, tincidunt quis tempus ac, imperdiet sit amet arcu. In lectus dolor, sagittis non fermentum non, viverra eget libero. Maecenas ullamcorper lobortis purus, ac dictum ipsum posuere id. Vestibulum eu mi pulvinar, mollis nibh in, feugiat felis. Donec at augue bibendum, hendrerit mi sit amet, mattis urna.

## Callouts

::: spoiler
### Imperdiet sit amet arcu. In lectus dolor, sagittis non fermentum non

*lol* mdr

- 1
- 2
- 3
:::

::: dm Callout avec un titre
Imperdiet sit amet arcu. In lectus dolor, sagittis non fermentum non
:::

## Images

![pouet](https://picsum.photos/100/100)

## Lists

- Imperdiet sit amet arcu
- Imperdiet sit amet arcu
- Imperdiet sit amet arcu
  - Imperdiet sit amet arcu
  - Imperdiet sit amet arcu
  - Imperdiet sit amet arcu

1. Imperdiet sit amet arcu
2. Imperdiet sit amet arcu
    - Imperdiet sit amet arcu
    - Imperdiet sit amet arcu
3. Imperdiet sit amet arcu

## Tables

Table: Environnements aléatoires

| d4  | Environnement |
| --- | ------------- |
| 1   | Plaine        |
| 2   | Marais        |
| 3   | Forêt         |
| 4   | Montagne      |

## Definition lists

**Lorem** : ipsum dolor sit amet.

**Ex** : nec euismod justo facilisis vitae.

**Morbi** : metus dui, tincidunt quis tempus ac.

`

export default defaultEditorValue
