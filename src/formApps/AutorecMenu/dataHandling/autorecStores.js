import { writable } from 'svelte/store';

let data = {};

export const fullStore = writable(data)

export const meleeStore = writable(fullStore?.melee)
export const rangeStore = writable(fullStore?.range)
export const staticStore = writable(fullStore?.static)
export const templateStore = writable(fullStore?.templatefx)
export const auraStore = writable(fullStore?.aura)
export const presetStore = writable(fullStore?.preset)
export const aefxStore = writable (fullStore?.aefx)
