<template>
    <input
        v-model="title"
        type="text"
        placeholder="Filter by title"
        :disabled="isDisabled"
    />
</template>

<script>
export default {
    name: 'TodosFilter',

    props: {
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },

    data: () => {
        return {};
    },

    computed: {
        title: {
            get() {
                return this.$store.state.todos.filter.title;
            },
            set(value) {
                this.$store.commit('todos/filter', { field: 'title', value });
            },
        },
    },
};
</script>
