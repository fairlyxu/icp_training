export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'qsort' : IDL.Func([IDL.Vec(IDL.Nat)], [IDL.Vec(IDL.Nat)], []),
  });
};
export const init = ({ IDL }) => { return []; };
