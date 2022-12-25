<template>
    <div class="todos-item">
        <div
            :class="[
                'todos-item_status',
                {
                    'todos-item_status__completed': todo.completed,
                },
            ]"
        >
            <i v-if="todo.completed" class="fa-regular fa-circle-check"></i>
            <i v-else class="fa-regular fa-circle"></i>
        </div>

        <div class="todos-item_content">
            <div class="todos-item_title">{{ todo.title }}</div>
            <div v-if="!isUser" class="todos-item_author">
                by
                <nuxt-link
                    :to="{
                        query: { userId: todo.userId },
                    }"
                    ><b>{{ todo.user.name }}</b></nuxt-link
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TodosItem',

    props: {
        todo: {
            type: Object,
            required: true,
        },
    },

    computed: {
        isUser() {
            return Boolean(this.$route.query.userId);
        },
    },
};
</script>
