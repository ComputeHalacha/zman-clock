const usePresetEnv = process.env.USE_PRESET_ENV === 'true';

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    ...(usePresetEnv ? {
      'postcss-preset-env': {
        stage: 2,
        features: {
          'oklab-function': true,
          'color-function': true,
        },
        browsers: 'Android >= 5.0',
      }
    } : {}),
  },
}
