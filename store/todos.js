export const state = () => ({
    filter: {
        title: '',
        userId: '',
    },
});

export const mutations = {
    filter(state, { field, value }) {
        state.filter[field] = value;
    },
};
