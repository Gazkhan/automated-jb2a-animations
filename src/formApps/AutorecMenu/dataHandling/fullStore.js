import { writable } from 'svelte/store';

let data = {};

const fullStore = writable(data)
