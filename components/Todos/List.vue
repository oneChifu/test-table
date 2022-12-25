<template>
    <div>
        <div class="todos-list">
            <LoaderIndicator
                :is-loading="loading && !state.error"
                is-absolute
            />

            <div v-if="!loading && !todos.length" class="todos_empty">
                There are no todo's
                <span v-if="filter.title"
                    >with keyword <b>{{ filter.title }}</b></span
                >
            </div>

            <TodosItem v-for="todo in todos" :key="todo.id" :todo="todo" />
        </div>

        <Pagination v-if="!state.error" :pagination="pagination" />
    </div>
</template>

<script>
export default {
    name: 'TodosList',

    props: {
        state: {
            type: Object,
            default: () => ({}),
        },
        loading: {
            type: Boolean,
            default: false,
        },
        filter: {
            type: Object,
            default: () => ({}),
        },
        todos: {
            type: Array,
            required: true,
        },
        pagination: {
            type: Object,
            required: true,
        },
    },
};
</script>
