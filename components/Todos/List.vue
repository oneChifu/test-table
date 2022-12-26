<template>
    <div>
        <div class="todos-list">
            <LoaderIndicator
                :is-loading="(loading && !state.error) || state.pending"
                is-absolute
            />

            <div v-if="!todos.length && !state.pending" class="todos_empty">
                There are no todo's
                <span v-if="filter.title"
                    >with keyword <b>{{ filter.title }}</b></span
                >
            </div>

            <TodosItem v-for="todo in todos" :key="todo.id" :todo="todo" />
        </div>

        <Pagination v-if="!state.error && !state.pending" v-bind="pagination" />
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
