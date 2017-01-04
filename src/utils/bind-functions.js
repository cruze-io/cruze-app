export default function bindFunctions(ref, functions) {
  functions.forEach(f => ref[f] = ref[f].bind(ref));
}