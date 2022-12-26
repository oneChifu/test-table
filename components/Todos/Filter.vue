<template>
    <div class="todos-filter">
        <input
            v-model="title"
            class="todos-filter_input"
            type="text"
            placeholder="Filter by title"
            :disabled="isDisabled"
        />
    </div>
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

    computed: {
        title: {
            get() {
                return this.$store.state.todos.filter.title;
            },
            set(value) {
                if (!value.trim()) {
                    return;
                }

                this.$store.commit('todos/filter', {
                    field: 'title',
                    value: value.trim(),
                });
            },
        },
    },
};
</script>
