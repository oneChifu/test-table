<template>
    <div
        v-if="loading || isLoading"
        :class="[
            'loader',
            {
                loader__relative: isRelative,
                loader__absolute: isAbsolute,
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
        isRelative: {
            type: Boolean,
            default: false,
        },
        isAbsolute: {
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    padding: 1rem;
    text-align: center;
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.3);
}
.loader__relative {
    position: relative;
    height: auto;
    width: auto;
    background: none;
}
.loader__absolute {
    position: absolute;
}
.loader_loading {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: 4px solid rgb(0, 124, 219, 0.7);
    border-radius: 50%;
    border-top-color: #007cdb;
    animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}
</style>
