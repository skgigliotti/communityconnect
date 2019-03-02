module.exports = (api) => {
    api.cache(true);

    const plugins = [
        "emotion",
    ];

    return {
        plugins,
    };
};
