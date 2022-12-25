<template>
    <div class="pagination">
        <nuxt-link
            :to="{
                query: { ...$route.query, page: undefined },
            }"
            :class="[
                'pagination_item',
                {
                    pagination_item__disabled: !firstPage,
                },
            ]"
        >
            First
        </nuxt-link>

        <nuxt-link
            :to="{
                query: {
                    ...$route.query,
                    page: previousPage <= 1 ? undefined : previousPage,
                },
            }"
            :class="[
                'pagination_item',
                {
                    pagination_item__disabled: !previousPage,
                },
            ]"
        >
            Prev
        </nuxt-link>

        <nuxt-link
            v-for="(page, index) in pages"
            :key="index"
            :to="{
                query: { ...$route.query, page: page > 1 ? page : undefined },
            }"
            :class="[
                'pagination_item',
                'pagination_item__number',
                {
                    [$router.options.linkExactActiveClass]:
                        page === 1 && $route.query.page === undefined,
                },
            ]"
        >
            {{ page }}
        </nuxt-link>

        <nuxt-link
            :to="{
                query: { ...$route.query, page: nextPage },
            }"
            :class="[
                'pagination_item',
                {
                    pagination_item__disabled: !nextPage,
                },
            ]"
        >
            Next
        </nuxt-link>

        <nuxt-link
            :to="{
                query: { ...$route.query, page: lastPage },
            }"
            :class="[
                'pagination_item',
                {
                    pagination_item__disabled: !lastPage,
                },
            ]"
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
        },
    },

    computed: {
        previousPage() {
            return this.pagination.current - 1 < 1
                ? undefined
                : this.pagination.current - 1;
        },

        nextPage() {
            return this.pagination.current + 1 > this.pagination.last
                ? undefined
                : this.pagination.current + 1;
        },

        firstPage() {
            return this.pagination.current > 1 ? '/' : undefined;
        },

        lastPage() {
            return this.pagination.current >= this.pagination.last
                ? undefined
                : this.pagination.last;
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

<style lang="scss">
@import 'assets/scss/pagination.scss';
</style>
