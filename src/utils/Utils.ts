export function shuffleArray<T>(xs: T[]) {
  for(let i = xs.length - 1; i > 0; i--){
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = xs[i];
      xs[i] = xs[r];
      xs[r] = tmp;
  }
}    