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
// import getUsers from '../../data/users.js';
// import getTodos from '../../data/todos.js';

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
        try {
            const [usersData, todosData] = await Promise.all([
                this.getUsers(),
                this.getTodos(),
            ]);

            this.usersData = usersData;
            this.todosData = todosData;
        } catch (e) {
            throw new Error(e.message);
        }
    },

    computed: {
        filter() {
            return this.$store.state.todos.filter;
        },

        todos() {
            if (!this.todosData.length) return [];

            return [...this.todosData].map(todo => {
                // Add user data in to todo object
                todo.user = this.usersData.find(
                    user => user.id === todo.userId
                );

                // Replace title by adding <b> tag
                if (this.filter.title) {
                    todo.title = todo.title.replace(
                        this.filter.title,
                        `<b>${this.filter.title}</b>`
                    );
                }

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
            async handler() {
                if (this.$route.query.page && this.$route.query.page > 1) {
                    this.$router.replace({
                        query: { ...this.$router.query, page: undefined },
                    });
                } else {
                    this.todosData = await this.getTodos();
                }
            },
        },

        '$route.query': {
            async handler() {
                this.todosData = await this.getTodos();

                if (process.client) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                    }, 150);
                }
            },
            deep: true,
        },
    },

    methods: {
        // Get USERS data from https://jsonplaceholder.typicode.com/todos and return promise
        async getUsers() {
            try {
                // TEMP get data from local file
                // const { data } = await getUsers();

                const data = await this.$axios.$get(
                    `https://jsonplaceholder.typicode.com/users`
                );

                return new Promise(resolve => {
                    resolve(data);
                });
            } catch (error) {
                throw new Error(error.message);
            }
        },

        // Get TODOS data from https://jsonplaceholder.typicode.com/todos and return promise
        async getTodos() {
            this.loading = true;

            try {
                // TEMP get data from local file
                // const { data, headers } = await getTodos();

                const { data, headers } = await this.$axios.get(
                    `https://jsonplaceholder.typicode.com/todos`,
                    {
                        params: {
                            _page: this.$route.query.page || 1,
                            _limit: this.pagination.limit,
                            title_like: this.filter.title || undefined,
                            userId: this.$route.query.userId || undefined,
                        },
                    }
                );

                this.processHeadersLink(headers.link);

                return new Promise(resolve => {
                    resolve(data);
                });
            } catch (error) {
                throw new Error(error.message);
            } finally {
                this.loading = false;
            }
        },

        // Parse links for pagination from "jsonplaceholder.typicode.com" service
        processHeadersLink(headersLink) {
            if (headersLink) {
                const {
                    last: { _page },
                } = parseLinkHeader(headersLink);
                this.pagination.last = Number(_page);
            } else {
                this.pagination.last = 1;
            }

            this.pagination.current = Number(this.$route.query.page || 1);
        },
    },
};
</script>

<style lang="scss">
@import 'assets/scss/todos.scss';
</style>
