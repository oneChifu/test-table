<template>
    <div
        v-if="(loading && !isBlock) || (isBlock && isLoading)"
        :class="[
            'loader',
            {
                loader__block: isBlock,
            },
        ]"
    >
        <div class="loader_loading"></div>
    </div>
</template>

<script>
export default {
    name: 'LoaderIndicator',

    props: {
        isBlock: {
            type: Boolean,
            default: false,
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        loading: false,
    }),

    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        },
    },
};
</script>

<style scoped>
.loader {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000;
    padding: 1rem;
    text-align: center;
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
}
.loader__block {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
}
.loader_loading {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: 4px solid rgba(7, 165, 110, 0.7);
    border-radius: 50%;
    border-top-color: #048658;
    animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}
</style>
