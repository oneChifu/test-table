<template>
    <div class="todos_header">
        <div>
            <nuxt-link to="/" class="todos_header-logo">TODO'S</nuxt-link>

            <div v-if="isUser" class="todos_header-author">
                by <b>{{ user.name }}</b>
            </div>
        </div>

        <TodosFilter :is-disabled="Boolean(state.error)" />
    </div>
</template>

<script>
export default {
    name: 'TodosHeader',

    props: {
        state: {
            type: Object,
            default: () => ({}),
        },
        user: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        isUser() {
            return Boolean(Object.keys(this.user).length);
        },
    },
};
</script>
