<svelte:options accessors={true} />

<script>
    import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
    import { fade, fly } from "svelte/transition";
    import CustomPicker from "./customPicker.svelte";
    import CopyClipBoard from "./copyOnClick.svelte";
    import {
        aaTypeMenu,
        aaNameMenu,
        aaVariantMenu,
        aaColorMenu,
    } from "../../animation-functions/databases/jb2a-menu-options.js";

    export let primary;



</script>

<div in:fade>
    <!--Unless spawned from "Explosions", Show the main Animation Type Select-->
    <div class="aa-3wide aa-select-label" in:fade>
        <!--Copy Button-->
        <div class="flexcol" style="grid-row:2/3;grid-column:1/2">
            <label
                for=""
                on:click={copy}
                style="align-self: center; position:relative; bottom: 7px;font-size:large"
                title="Copy Database Path"
                >{localize("autoanimations.menus.copy")} DB {localize("autoanimations.menus.path")} <i
                    class="fas fa-database aa-zoom"
                    style="color: rgba(50, 79, 245, 0.5);"
                /></label
            >
            <div id="clipboard" />
        </div>
        <!--Type Menu-->
        <div
            class="flexcol {isCustom ? 'aa-disabled' : ''}"
            style="grid-row: 2 / 3;grid-column: 2 / 3;"
        >
            <label for="2">{localize("autoanimations.menus.type")}</label>
            <select
                bind:value={primary.menuType}
                on:change={async () => await menuTypeChange()}
                id="2"
                disabled={isCustom}
            >
                {#if animType != ""}
                    {#each Object.entries(aaTypeMenu[menuSelection]) as [key, name]}
                        <option value={key}>{name}</option>
                    {/each}
                {/if}
            </select>
        </div>
        <!--Animation Menu-->
        <div
            class="flexcol {isCustom ? 'aa-disabled' : ''}"
            style="grid-row: 3 / 4;grid-column: 1 / 2;"
        >
            <label for="3">{localize("autoanimations.menus.animation")}</label>
            <select
                bind:value={primary.animation}
                on:change={async () => await animationChange()}
                id="3"
                disabled={isCustom}
            >
                {#if primary.menuType != ""}
                    {#each Object.entries(aaNameMenu[menuSelection][primary.menuType]) as [key, name]}
                        <option value={key}>{name}</option>
                    {/each}
                {/if}
            </select>
        </div>
        <!--Variant Menu-->
        <div
            class="flexcol {isCustom ? 'aa-disabled' : ''}"
            style="grid-row: 3 / 4;grid-column: 2 / 3;"
        >
            <label for="4">{localize("autoanimations.menus.variant")}</label>
            <select
                bind:value={primary.variant}
                on:change={async () => await variantChange()}
                id="4"
                disabled={isCustom}
            >
                {#if (primary.menuType != "") & (primary.animation != "")}
                    {#each Object.entries(aaVariantMenu[menuSelection][primary.menuType][primary.animation]) as [key, name]}
                        <option value={key}>{name}</option>
                    {/each}
                {/if}
            </select>
        </div>
        <!--Color Menu-->
        <div
            class="flexcol {isCustom ? 'aa-disabled' : ''}"
            style="grid-row: 3 / 4;grid-column: 3 / 4;"
        >
            <label for="5">{localize("autoanimations.menus.color")}</label>
            <select bind:value={primary.color} id="5" disabled={isCustom}>
                {#if primary.menuType != "" && primary.animation != "" && primary.variant != ""}
                    {#each Object.entries(aaColorMenu[menuSelection][primary.menuType][primary.animation][primary.variant]) as [key, name]}
                        <option value={key}>{name}</option>
                    {/each}
                {/if}
            </select>
        </div>
    </div>
</div>

<style lang="scss">
    .aa-3wide label {
        align-self: center;
    }
    .aa-disabled label {
        opacity: 0.3;
        transition: opacity 0.5s;
    }
    .aa-3wide select:disabled {
        opacity: 0.3;
        transition: opacity 0.5s;
    }
    .aa-zoom:hover {
        transform: scale(1.2);
    }
    .aa-return button {
        border-radius: 10px;
        border: 2px outset rgb(142, 142, 142);
        font-family: "Signika", sans-serif;
        font-size: 14px;
        line-height: 1.25em;
        width: 75%;
        align-self: center;
    }
    .aa-return button:disabled {
        opacity: 0.3;
        transition: opacity 0.5s;
    }
    .aa-select-label label{
        font-size: large;
    }
</style>
