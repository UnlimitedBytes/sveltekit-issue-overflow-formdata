<!-- THIS FILE IS NOT BUG RELEVANT -->

<main>
    <slot />
</main>

<style>
    :global(body) {
        background: #282c34;
        color:#eee;
        font-family: sans-serif;
        margin: 0;
    }

    :global(a) {
        color:#56b6c2;
        text-decoration: none;
    }

    :global(a:hover) {
        text-decoration: underline;
    }

    main {
        max-width: 700px;
        padding: 0 1em;
    }
</style>