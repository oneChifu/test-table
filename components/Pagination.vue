<template>
    <div class="pagination">
        <nuxt-link to="/"> First </nuxt-link>

        <nuxt-link
            :to="{
                query: { page: previousPage },
            }"
        >
            Prev
        </nuxt-link>

        <nuxt-link
            v-for="(page, index) in pages"
            :key="index"
            :to="{
                query: { ...$route.query, page: page > 1 ? page : undefined },
            }"
        >
            {{ page }}
        </nuxt-link>

        <nuxt-link
            :to="{
                query: { page: nextPage },
            }"
        >
            Next
        </nuxt-link>

        <nuxt-link
            :to="{
                query: { page: lastPage },
            }"
        >
            Last
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'PaginationComponent',

    props: {
        pagination: {
            type: Object,
            required: true,
            validator: obj => {
                return (
                    !isNaN(obj.limit) && !isNaN(obj.current) && !isNaN(obj.last)
                );
            },
        },
    },

    computed: {
        previousPage() {
            const previousPage = this.pagination.current - 1;
            return previousPage <= 1 ? undefined : previousPage;
        },

        nextPage() {
            const nextPage = this.pagination.current + 1;
            return nextPage > this.pagination.last
                ? this.pagination.last
                : nextPage;
        },

        lastPage() {
            return this.pagination.last;
        },

        pages() {
            const pages = [this.pagination.current];

            if (this.pagination.current - 1 >= 1) {
                pages.unshift(this.pagination.current - 1);
            }

            if (this.pagination.current + 1 <= this.pagination.last) {
                pages.push(this.pagination.current + 1);
            }

            if (
                pages.length < 3 &&
                this.pagination.current + 2 <= this.pagination.last
            ) {
                pages.push(this.pagination.current + 2);
            }

            if (pages.length < 3 && this.pagination.current - 2 > 1) {
                pages.unshift(this.pagination.current - 2);
            }

            return pages;
        },
    },
};
</script>
