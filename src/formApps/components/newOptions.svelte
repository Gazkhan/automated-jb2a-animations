<script>
    import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
    import { fade } from "svelte/transition";

    import { TJSSvgFolder } from "@typhonjs-fvtt/svelte-standard/component";

    import OptionsDialog from "../components/optionsInfoDialog.js";
    import { menuAnimType } from "../ItemMenu/menuStore.js";

    export let flagData;
    export let animType;
    export let menuType;
    export let sectionOptions;

    const options = flagData.options || {};
    $: animType = animType;
    $: menuType = menuType;
    /*
    let repeat = options.repeat || 1;
    $: repeat = options.repeat = repeat;

    let delay = options.delay || 250;
    $: delay = options.delay = delay;

    let scale = options.scale || 1;
    $: scale = options.scale = scale;

    let auraRadius = options.auraRadius;
    $: auraRadius = options.auraRadius = auraRadius;

    let belowToken = options.below || false;
    $: belowToken = options.below = belowToken;

    let opacity = options.opacity || 1;
    $: opacity = options.opacity = opacity > 1 ? 1 : opacity;

    let zIndex = options.zIndex || 1;
    $: zIndex = options.zIndex = zIndex;

    let unbindAlpha = options.unbindAlpha || false;
    $: unbindAlpha = options.unbindAlpha = unbindAlpha;

    let unbindVisbility = options.unbindVisbility || false;
    $: unbindVisbility = options.unbindVisbility = unbindVisbility;

    let persistent = options.persistent || false;
    $: persistent = options.persistent = persistent;
    */
    let removeTemplate = options.removeTemplate || false;
    $: removeTemplate = options.removeTemplate = removeTemplate;
    $: isRemove = removeTemplate
        ? game.i18n.localize("autoanimations.menus.yes")
        : game.i18n.localize("autoanimations.menus.no");

    let ignoreTarget = options.ignoreTarget || false;
    $: ignoreTarget = options.ignoreTarget = ignoreTarget;
    $: isIgnore = ignoreTarget
        ? game.i18n.localize("autoanimations.menus.yes")
        : game.i18n.localize("autoanimations.menus.no");

    let scaleX = options.scaleX;
    $: scaleX = options.scaleX = scaleX;

    let scaleY = options.scaleY;
    $: scaleY = options.scaleY = scaleY;

    let persistType = options.persistType || "sequencerground";
    $: persistType = options.persistType = persistType;
    $: removeTemplate =
        persistType === "attachtemplate" ? false : removeTemplate;

    let occlusionMode = options.occlusionMode || "3";
    $: occlusionMode = options.occlusionMode = occlusionMode;

    let occlusionAlpha = options.occlusionAlpha || 0.5;
    $: occlusionAlpha = options.occlusionAlpha =
        occlusionAlpha > 1 ? 1 : occlusionAlpha;

    function below() {
        belowToken = !belowToken;
    }

    $: aboveBelow = sectionOptions.below
        ? game.i18n.localize("autoanimations.menus.below")
        : game.i18n.localize("autoanimations.menus.above");
    $: bindAlpha = sectionOptions.unbindAlpha
        ? game.i18n.localize("autoanimations.menus.unbound")
        : game.i18n.localize("autoanimations.menus.bound");
    $: bindVisibility = sectionOptions.unbindVisbility
        ? game.i18n.localize("autoanimations.menus.unbound")
        : game.i18n.localize("autoanimations.menus.bound");
    $: isPersistent = sectionOptions.persistent
        ? game.i18n.localize("autoanimations.menus.persistant")
        : game.i18n.localize("autoanimations.menus.not") +
          " " +
          game.i18n.localize("autoanimations.menus.persistant");
    function switchPersistence() {
        persistent = !persistent;
        let newPersistance = persistent;
        if (newPersistance) {
            repeat = 1;
        }
    }
    function switchRemove() {
        removeTemplate = !removeTemplate;
        isMasked = removeTemplate ? false : isMasked;
    }

    function switchIgnore() {
        ignoreTarget = !ignoreTarget;
    }
    /*
    let menuSelection = flagData.animType;
    menuAnimType.subscribe((value) => {
        menuSelection = value;
    });
    
    $: menuSelection = menuSelection;
    $: disabled01 =
        animType === "melee" ||
        animType === "range" ||
        menuSelection === "melee" ||
        menuSelection === "range";
    $: isDisabled =
        animType === "melee" ||
        animType === "range" ||
        menuSelection === "melee" ||
        menuSelection === "range"
            ? false
            : persistent;
    */
    let isDisabled = true;
    /*
    let addToken = options.addTokenWidth || false;
    $: addToken = options.addTokenWidth = addToken;
    function switchAddToken() {
        addToken = !addToken;
    }
    */
    $: addToken = sectionOptions.addTokenWidth = addToken;
    $: isAddToken = sectionOptions.addTokenWidth
        ? game.i18n.localize("autoanimations.menus.yes")
        : game.i18n.localize("autoanimations.menus.no");

    function optionsInfo() {
        console.log(TJSSvgFolder)
        new OptionsDialog().render(true);
    }

    let isMasked = options.isMasked || false;
    $: isMasked = options.isMasked = isMasked;
    $: maskLabel = isMasked
        ? game.i18n.localize("autoanimations.menus.enabled")
        : game.i18n.localize("autoanimations.menus.disabled");
    function switchMask() {
        isMasked = !isMasked;
    }
    let optionsShown = options.showOptions ?? false;
    $: optionsShown = options.showOptions = optionsShown;

    const folderOptions = {
        styles: {
            "--tjs-summary-font-family":
                '"Modesto Condensed", "Palatino Linotype", serif',
            "--tjs-summary-font-size": "1.5em",
            "--tjs-summary-chevron-size": "0.8em",
        },
    };
</script>

<div class="aa-options-border" in:fade>
    <TJSSvgFolder
        folder={folderOptions}
        label={`${localize("autoanimations.menus.options")}`}
    >
        <div slot="summary-end">
            <i
                class="fas fa-info-circle aa-info-icon aa-zoom aa-adjust-pos"
                title={localize("autoanimations.menus.quickReference")}
                on:click={() => optionsInfo()}
            />
        </div>
        <div class="aa-options" hidden in:fade>
            <!--Persistent Setting-->
            <div
                class="flexcol {disabled01 || animType === 'aura'
                    ? 'aa-disabled'
                    : ''}"
                style="grid-row: 1 / 2; grid-column: 1 / 2;"
            >
                <label for=""
                    >{localize("autoanimations.menus.persistence")}</label
                >
                <button
                    on:click={() => sectionOptions.persistent = !sectionOptions.persistent}
                    disabled={disabled01 || animType === "aura"}
                    >{isPersistent}</button
                >
            </div>
            <!--Set Z-Index-->
            <div class="flexcol" style="grid-row: 1 / 2; grid-column: 2 / 3;">
                <label for="">{localize("autoanimations.menus.level")}</label>
                <button class="oldCheck" on:click={() => sectionOptions.below = !sectionOptions.below}
                    >{aboveBelow}</button
                >
            </div>
            <!--Bind/Unbind Visibility (for Persistent Effects)-->
            <div
                class="flexcol {disabled01 ||
                animType === 'templatefx' ||
                (!persistent && animType !== 'aura')
                    ? 'aa-disabled'
                    : ''}"
                style="grid-row: 1 / 2; grid-column: 3 / 4;"
            >
                <label for=""
                    >{localize("autoanimations.menus.visibility")}</label
                >
                <button
                    on:click={() => sectionOptions.unbindVisbility = !sectionOptions.unbindVisbility}
                    disabled={disabled01 ||
                        animType === "templatefx" ||
                        (!persistent && animType !== "aura")}
                    >{bindVisibility}</button
                >
            </div>
            <!--Bind/Unbind Opacity (for Persistent Effects)-->
            <div
                class="flexcol {disabled01 ||
                animType === 'templatefx' ||
                (!persistent && animType !== 'aura')
                    ? 'aa-disabled'
                    : ''}"
                style="grid-row: 1 / 2; grid-column: 4 / 5;"
            >
                <label for="">{localize("autoanimations.menus.alpha")}</label>
                <button
                    on:click={() => sectionOptions.unbindAlpha = !sectionOptions.unbindAlpha}
                    disabled={disabled01 ||
                        animType === "templatefx" ||
                        (!persistent && animType !== "aura")}
                    >{bindAlpha}</button
                >
            </div>
            <!--Set the Masking Boolean-->
            <div
                class="flexcol {disabled01 || removeTemplate
                    ? 'aa-disabled'
                    : ''}"
                style="grid-row: 2 / 3; grid-column: 1 / 2;"
            >
                <label for="">{localize("autoanimations.menus.masking")}</label>
                <button
                    class={isMasked ? "aa-selected" : "aa-notSelected"}
                    disabled={disabled01 || removeTemplate}
                    on:click={() => sectionOptions.isMasked = !sectionOptions.isMasked}>{maskLabel}</button
                >
            </div>
            <!--Set Number of times the animation plays-->
            <div
                class="flexcol {isDisabled || animType === 'aura'
                    ? 'aa-disabled'
                    : ''}"
                style="grid-row: 2 / 3; grid-column: 2 / 3;"
            >
                <label for="">{localize("autoanimations.menus.repeat")}</label>
                <input
                    disabled={isDisabled || animType === "aura"}
                    type=number
                    bind:value={sectionOptions.repeat}
                    placeholder=1
                />
            </div>
            <!--Set delay between repeats-->
            <div
                class="flexcol {isDisabled || animType === 'aura'
                    ? 'aa-disabled'
                    : ''}"
                style="grid-row: 2 / 3; grid-column: 3 / 4;"
            >
                <label for=""
                    >{localize("autoanimations.menus.repeat")}
                    {localize("autoanimations.menus.delay")}</label
                >
                <input
                    disabled={isDisabled || animType === "aura"}
                    type=number
                    bind:value={sectionOptions.delay}
                    placeholder=250
                />
            </div>
            <!--Set Scale of Animation. Not rendered if Anim Type is Templates-->
            {#if animType !== "templatefx"}
                {#if animType === "aura"}
                    <div
                        class="flexcol"
                        style="grid-row: 2 / 3; grid-column: 4 / 5;"
                    >
                        <label for=""
                            >{localize("autoanimations.menus.radius")}</label
                        >
                        <input
                            type=number
                            bind:value={sectionOptions.radius}
                            placeholder=3.5
                            step=0.01
                        />
                    </div>
                    <!--Add Token Width-->
                    <div
                        class="flexcol"
                        style="grid-row: 3 / 4; grid-column: 3 / 4;"
                    >
                        <label for=""
                            >{localize("autoanimations.menus.add")}
                            {localize("autoanimations.menus.token")}
                            {localize("autoanimations.menus.width")}</label
                        >
                        <button
                            class={addToken ? "aa-selected" : "aa-notSelected"}
                            on:click={() => sectionOptions.addTokenWidth = !sectionOptions.addTokenWidth}
                            >{isAddToken}</button
                        >
                    </div>
                {:else}
                    <div
                        class="flexcol {animType === 'range'
                            ? 'aa-disabled'
                            : ''}"
                        style="grid-row: 2 / 3; grid-column: 4 / 5;"
                    >
                        <label for=""
                            >{localize("autoanimations.menus.scale")}</label
                        >
                        <input
                            type=number
                            disabled={animType === "range"}
                            bind:value={sectionOptions.scale}
                            placeholder=1
                            step=0.01
                        />
                    </div>
                {/if}
            {/if}
            <!--Set Animation Opacity-->
            <div
                class="flexcol"
                style="grid-row: 3 / 4; grid-column: 1 / 2;"
                in:fade
            >
                <label for="aaOpacity"
                    >{localize("autoanimations.menus.opacity")}</label
                >
                <div class="form-group">
                    <input
                        style="font-weight: normal;background:rgb(191 187 182);font-size:14px;height:1.5em;max-width: 3.5em;font-family: Signika, sans-serif;"
                        type=number
                        id="aaOpacity"
                        bind:value={sectionOptions.opacity}
                        placeholder=1
                        min=0
                        max=1
                        step=0.01
                    />
                    <input
                        style="border:none; background:none"
                        type=range
                        min=0
                        max=1
                        step=0.01
                        bind:value={sectionOptions.opacity}
                    />
                </div>
            </div>
            <!--Set Z-Index of Animation-->
            <div>
                <div
                    class="flexcol"
                    style="grid-row: 3 /4; grid-column: 2 / 3;"
                >
                    <label for=""
                        >{localize("autoanimations.menus.z-index")}</label
                    >
                    <input
                        type=number
                        bind:value={sectionOptions.zIndex}
                        placeholder=1
                        step=1
                    />
                </div>
            </div>
            <!-- Aura Specific Setting-->
            {#if animType === "aura"}
                <!--Ignore Targets-->
                <div
                    class="flexcol"
                    style="grid-row: 3 / 4; grid-column: 4 / 5;"
                >
                    <label for=""
                        >{localize("autoanimations.menus.ignoreTargets")}</label
                    >
                    <button
                        class={ignoreTarget ? "aa-selected" : "aa-notSelected"}
                        on:click={() => sectionOptions.ignoreTarget = !sectionOptions.ignoreTarget}>{isIgnore}</button
                    >
                </div>
            {/if}
            <!--Template Specific Settings-->
            {#if animType === "templatefx"}
                <!--Set Scale in X-->
                <div
                    class="flexcol"
                    style="grid-row: 2 / 3; grid-column: 4 / 5;"
                >
                    <label for=""
                        >{localize("autoanimations.menus.scale")} X</label
                    >
                    <input type=number bind:value={sectionOptions.scaleX} placeholder=1 />
                </div>
                <!--Set Scale in Y-->
                <div
                    class="flexcol"
                    style="grid-row: 3 / 4; grid-column: 4 / 5;"
                >
                    <label for=""
                        >{localize("autoanimations.menus.scale")} Y</label
                    >
                    <input type=number bind:value={sectionOptions.scaleY} placeholder=1 />
                </div>
                <!--Remove Template option-->
                <div
                    class="flexcol"
                    style="grid-row: 3 / 4; grid-column: 3 / 4;"
                >
                    <label for=""
                        >{localize("autoanimations.menus.remove")}</label
                    >
                    <button
                        class={removeTemplate
                            ? "aa-selected"
                            : "aa-notSelected"}
                        on:click={() => sectionOptions.removeTemplate = !sectionOptions.removeTemplate}>{isRemove}</button
                    >
                </div>
                <!--Template Specific Persistent options-->
                {#if persistent}
                    <!--Set Persistent Type-->
                    <div
                        class="flexcol"
                        style="grid-row: 4 / 5;grid-column: 2 / 4;"
                        in:fade
                    >
                        <label for="1"
                            >{localize("autoanimations.menus.persistant")}
                            {localize("autoanimations.menus.type")}</label
                        >
                        <select
                            bind:value={sectionOptions.persistType}
                            style="text-align: center;justify-self: center;margin-right:15%; margin-left:15%"
                        >
                            {#if menuType === "circle" || menuType === "square"}
                                <option value="overheadtile"
                                    >{localize(
                                        "autoanimations.menus.overheadtile"
                                    )}</option
                                >
                                <option value="groundtile"
                                    >{localize(
                                        "autoanimations.menus.groundtile"
                                    )}</option
                                >
                            {/if}
                            <option value="sequencerground"
                                >{localize(
                                    "autoanimations.menus.sequencereffect"
                                )}</option
                            >
                            <option value="attachtemplate"
                                >{localize(
                                    "autoanimations.menus.attachtotemplate"
                                )}</option
                            >
                        </select>
                    </div>
                    <!--Template Specific Persistent options for Overhead Tiles-->
                    {#if persistType === "overheadtile"}
                        <!--Set Occlusion Mode-->
                        <div
                            class="flexcol"
                            style="grid-row: 5 / 6;grid-column: 1 / 3;"
                            in:fade
                        >
                            <label for="1"
                                >{localize(
                                    "autoanimations.menus.occlusionMode"
                                )}</label
                            >
                            <select
                                bind:value={sectionOptions.occlusionMode}
                                id="1"
                                style="text-align: center;justify-self: center;"
                            >
                                <option value="3"
                                    >{localize(
                                        "autoanimations.menus.occlusion03"
                                    )}</option
                                >
                                <option value="1"
                                    >{localize(
                                        "autoanimations.menus.occlusion01"
                                    )}</option
                                >
                                <option value="2"
                                    >{localize(
                                        "autoanimations.menus.occlusion02"
                                    )}</option
                                >
                                <option value="0"
                                    >{localize(
                                        "autoanimations.menus.occlusion00"
                                    )}</option
                                >
                            </select>
                        </div>
                        <!--Set Occlusion Alpha-->
                        <div
                            class="flexcol"
                            style="grid-row: 5 / 6; grid-column: 3 / 4;"
                            in:fade
                        >
                            <label for=""
                                >{localize(
                                    "autoanimations.menus.occlusionAlpha"
                                )}</label
                            >
                            <div class="form-group">
                                <input
                                    type="number"
                                    style="font-weight: normal;background:rgb(191 187 182);font-size:14px;height:1.5em;max-width: 3.5em;font-family: Signika, sans-serif;"
                                    bind:value={sectionOptions.occlusionAlpha}
                                    placeholder=1
                                    min=0
                                    max=1
                                    step=0.01
                                />
                                <input
                                    type=range
                                    style="background:none;border:none"
                                    min=0
                                    max=1
                                    step=0.01
                                    bind:value={sectionOptions.occlusionAlpha}
                                />
                            </div>
                        </div>
                    {/if}
                {/if}
            {/if}
        </div>
    </TJSSvgFolder>
</div>

<style lang="scss">
    .aa-options select {
        text-align: center;
        font-weight: bold;
        min-height: 2em;
        border-radius: 5px;
    }
    .oldCheck {
        align-self: bottom;
    }
    .aa-options input:disabled {
        opacity: 0.3;
        transition: opacity 0.5s;
    }
    .aa-options button:disabled {
        opacity: 0.3;
        transition: opacity 0.5s;
    }
    .aa-disabled label {
        opacity: 0.3;
        transition: opacity 0.5s;
    }
    .aa-adjust-pos {
        position: relative;
        left: 10px;
    }
</style>
