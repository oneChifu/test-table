export default function ({ query, redirect }) {
    if (!Number(query.page)) {
        return;
    }

    if (query.page && (isNaN(query.page) || query.page <= 1)) {
        redirect({ query: { ...query, page: undefined } });
    }
}
