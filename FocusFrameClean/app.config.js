export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      openaiApiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    },
  };
};
