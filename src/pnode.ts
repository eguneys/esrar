export type PNode<A> = {
  data: A,
  children: Array<PNode<A>>
};

export function pnode<A>(data: A) {
  return {
    data,
    children: []
  };
}

export function pAdd<A>(root: PNode<A>, child: PNode<A>) {
  root.children.push(child);
  return root;
}

export function pClimb<A>(root: PNode<A>, f: (a: A) => void) {
  f(root.data);
  root.children.forEach(_ => pClimb(_, f));
}

export function pClimbWithRoot<A, B>(rootValue: B, root: PNode<A>, f: (root: B, child: A, maxDepth: number) => B) {
  let rootNext = f(rootValue, root.data, pMaxDepth(root));
  root.children.forEach(_ => pClimbWithRoot(rootNext, _, f));
}

export function pMaxDepth<A>(root: PNode<A>): number {
  if (root.children[0]) {
    return 1 + pMaxDepth(root.children[0]);
  } else {
    return 0;
  }
}
