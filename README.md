Usage:

```js
import Esrar, { q, erm } from 'esrar'

let res = Esrar(`pgn_string`)

let pgns: Array<erm.QPGN> = res.pgns

let qpgn = pgns[0]

let { tags, fenMap } = qpgn



```

Fuzzy fen match against a pgn:

```js
let position = 'some fen'
q.qFen(qpgn, position)
```




