<template>
    <div class="todos">
        <div class="todos_header">
            <div class="todos_logo">TODO'S</div>

            <TodosFilter :is-disabled="$fetchState.error" />
        </div>

        <div v-if="$fetchState.error" class="error">
            {{ $fetchState.error.message }}
        </div>

        <LoaderIndicator
            v-if="loading && !$fetchState.error"
            is-block
            :is-loading="loading"
        />

        <TodosList v-else :todos="todos" />

        <Pagination
            v-if="!$fetchState.error && !$fetchState.pending"
            :pagination="pagination"
        />
    </div>
</template>

<script>
import parseLinkHeader from 'parse-link-header';
// import usersData from '../../data/users.js';
// import todosData from '../../data/todos.js';

export default {
    name: 'TodosComponent',

    data: () => {
        return {
            loading: true,
            usersData: [],
            todosData: [],
            pagination: {
                limit: 25,
                current: 1,
                last: 1,
            },
        };
    },

    async fetch() {
        this.loading = true;

        this.pagination.current = Number(this.$route.query.page || 1);

        const getUsers = this.$axios.get(
            `https://jsonplaceholder.typicode.com/users`
        );
        const getTodos = this.$axios.get(
            `https://jsonplaceholder.typicode.com/todos?_page=${this.pagination.current}&_limit=${this.pagination.limit}&title_like=${this.filter.title}`
        );

        // const getTodos = '';
        // const getTodos = import('~data/todos.json');

        // Pagination hook with first page
        if (this.$route.query.page <= 1) {
            this.$router.replace({ query: { page: undefined } });
        }

        try {
            const [
                { data: usersData },
                {
                    data: todosData,
                    headers: { link: todosLink },
                },
            ] = await Promise.all([getUsers, getTodos]);

            this.usersData = usersData;
            this.todosData = todosData;

            if (todosLink) {
                const {
                    last: { _page: last },
                } = parseLinkHeader(todosLink);
                this.pagination.last = Number(last);
            } else {
                this.pagination.last = 1;
            }
        } catch (e) {
            throw new Error(e.message);
        }

        this.loading = false;
    },

    fetchOnServer: false,

    computed: {
        filter() {
            return this.$store.state.todos.filter;
        },

        todos() {
            if (!this.todosData.length) return [];

            return this.todosData.map(todo => {
                todo.user = this.usersData.find(
                    user => user.id === todo.userId
                );

                return todo;
            });
        },
    },

    watch: {
        'filter.title': {
            handler() {
                if (
                    this.$route.query.page &&
                    this.$route.query.page !== this.pagination.current
                ) {
                    this.$router.replace({ query: { page: undefined } });
                } else {
                    this.$fetch();
                }
            },
        },

        '$route.query.page': {
            handler() {
                this.$fetch();
            },
        },
    },

    activated() {
        if (this.$fetchState.timestamp <= Date.now() - 30000) {
            this.$fetch();
        }
    },
};
</script>

<style lang="scss" scoped>
@import 'assets/scss/todos.scss';
</style>
