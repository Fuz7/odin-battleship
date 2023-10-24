module.exports = {
  preset: 'babel-jest',
  // Add other Jest configuration options here
  transform: {
    '^.+\\.js$': 'babel-jest',

  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|sass)$': 'identity-obj-proxy',
  },
};