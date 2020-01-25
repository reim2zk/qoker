export function shuffleArray<T>(xs: T[]) {
  for(let i = xs.length - 1; i > 0; i--){
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = xs[i];
      xs[i] = xs[r];
      xs[r] = tmp;
  }
}    

export function groupBy<K, X>(xs: X[], f: (x: X) => K): Map<K, X[]> {
  const map = new Map<K, X[]>()
  for(let x of xs) {
    const k = f(x)
    const xsk = map.get(k)
    if(xsk) {
      xsk.push(x)
    } else {
      map.set(k, [x])
    }
  }
  return map
}

export function count<T>(xs: T[]): {value: T, count: number}[] {
  const cardMap = groupBy(xs, x => x)
  let counts: {value: T, count: number}[] = []
  for(let kv of cardMap.entries()) {
      const v = {value: kv[0], count: kv[1].length}
      counts.push(v)
  }
  return counts
}

export function exists(xs: boolean[]): boolean {
  return xs.reduceRight((x, y) => x || y, false)
}