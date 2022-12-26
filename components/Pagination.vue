<template>
    <div class="pagination">
        <nuxt-link
            v-for="(page, index) in pages"
            :key="index"
            :to="{ query: page.query }"
            :disabled="page.disabled"
            :class="['pagination_item', page.class]"
        >
            {{ page.title }}
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'PaginationComponent',

    props: {
        limit: {
            type: Number,
            required: true,
        },
        current: {
            type: Number,
            required: true,
        },
        last: {
            type: Number,
            required: true,
        },
    },

    computed: {
        currentPage() {
            return Number(
                this.current > this.last
                    ? this.last
                    : this.$route.query.page || this.current
            );
        },

        pagesNumber() {
            const pages = [this.currentPage];

            if (this.currentPage - 1 >= 1) {
                pages.unshift(this.currentPage - 1);
            }

            if (this.currentPage + 1 <= this.last) {
                pages.push(this.currentPage + 1);
            }

            if (pages.length < 3 && this.currentPage + 2 <= this.last) {
                pages.push(this.currentPage + 2);
            }

            if (pages.length < 3 && this.currentPage - 2 > 1) {
                pages.unshift(this.currentPage - 2);
            }

            return pages;
        },

        pages() {
            const pages = new Set();

            pages.add({
                title: 'First',
                query: { ...this.$route.query, page: undefined },
            });

            pages.add({
                title: 'Prev',
                query: {
                    ...this.$route.query,
                    page:
                        this.currentPage - 1 <= 1
                            ? undefined
                            : this.currentPage - 1,
                },
            });

            for (const page of this.pagesNumber) {
                const exactActiveClass =
                    page === 1 &&
                    (!this.$route.query.page ||
                        this.$route.query.page > this.last)
                        ? this.$router.options.linkExactActiveClass
                        : '';

                pages.add({
                    isNumber: true,
                    title: page,
                    query: {
                        ...this.$route.query,
                        page: page <= 1 ? undefined : page,
                    },
                    class: ['pagination_item__number', exactActiveClass],
                });
            }

            pages.add({
                title: 'Next',
                query: {
                    ...this.$route.query,
                    page:
                        this.currentPage + 1 > this.last
                            ? this.last
                            : this.currentPage + 1,
                },
            });

            pages.add({
                title: 'Last',
                query: {
                    ...this.$route.query,
                    page: this.last,
                },
            });

            for (const page of pages) {
                page.disabled =
                    (!page.query.page && this.currentPage === 1) ||
                    (this.currentPage >= this.last &&
                        page.query.page >= this.last);
            }

            return Array.from(pages);
        },
    },
};
</script>

<style lang="scss">
@import 'assets/scss/pagination.scss';
</style>
