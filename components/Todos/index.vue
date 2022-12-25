<template>
    <div class="todos">
        <TodosHeader :state="$fetchState" :user="user" />

        <div v-if="$fetchState.error" class="error">
            {{ $fetchState.error.message }}
        </div>

        <TodosList
            :state="$fetchState"
            :loading="loading"
            :filter="filter"
            :todos="todos"
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
            timer: null,
            loading: false,
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
        this.pagination.current = Number(this.$route.query.page || 1);

        // Get query string from filtered queries array
        const todosQuery = '?'.concat(
            Object.entries({
                _page: this.pagination.current,
                _limit: this.pagination.limit,
                title_like: this.filter.title,
                userId: this.$route.query.userId,
            })
                .filter(query => query[1])
                .map(([key, value]) => {
                    return `${key}=${value}`;
                })
                .join('&')
        );

        // Get TODOS by axios
        const getTodos = this.$axios.get(
            `https://jsonplaceholder.typicode.com/todos${todosQuery}`
        );
        // Get USERS by axios
        const getUsers = this.$axios.get(
            `https://jsonplaceholder.typicode.com/users`
        );

        // Pagination hook with first page
        if (this.$route.query.page <= 1) {
            this.$router.replace({
                query: { ...this.$route.query, page: undefined },
            });
        }

        try {
            // Destructuring responce data from axios requests
            const [
                { data: usersData },
                {
                    data: todosData,
                    headers: { link: todosLink },
                },
            ] = await Promise.all([getUsers, getTodos]);

            this.usersData = usersData;
            this.todosData = todosData;

            // Parse links for pagination from "jsonplaceholder.typicode.com" service
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

        user() {
            return this.usersData.find(
                user => user.id === Number(this.$route.query.userId)
            );
        },
    },

    watch: {
        'filter.title': {
            handler() {
                if (
                    this.$route.query.page &&
                    this.$route.query.page !== this.pagination.current
                ) {
                    this.$router.replace({
                        query: { ...this.$router.query, page: undefined },
                    });
                } else {
                    this.refresh();
                }
            },
            immediate: true,
        },

        '$route.query': {
            handler() {
                if (process.client) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }

                this.refresh();
            },
            deep: true,
        },
    },

    methods: {
        refresh() {
            this.loading = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.$fetch();
            }, 300);
        },
    },
};
</script>

<style lang="scss">
@import 'assets/scss/todos.scss';
</style>
