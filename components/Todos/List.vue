<template>
    <div class="todos-list">
        <div v-if="!todos.length" class="todos-list_empty">
            There are no todo's
            <span v-if="filterTitle"
                >with keyword <b>{{ filterTitle }}</b></span
            >
        </div>

        <div v-for="todo in todos" :key="todo.id" class="todos_item">
            <div
                :class="[
                    'todos-list_status',
                    {
                        'todos-list_status__completed': todo.completed,
                    },
                ]"
            >
                <i v-if="todo.completed" class="fa-regular fa-circle-check"></i>
                <i v-else class="fa-regular fa-circle-xmark"></i>
            </div>

            <div class="todos-list_content">
                <div class="todos-list_title">{{ todo.title }}</div>
                <div class="todos-list_author">
                    Author: <span>{{ todo.user.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TodosList',

    props: {
        todos: {
            type: Array,
            required: true,
        },
    },

    computed: {
        filterTitle() {
            return this.$store.state.todos.filter.title;
        },
    },
};
</script>
