import { writable } from 'svelte/store';

// toggleCurtain
function toggleCurtain(initState){
  let {subscribe, update} = writable(initState);
  const toggle = () => update(s => !s)
  return {subscribe, toggle}
}

export const curtainState = toggleCurtain(false);