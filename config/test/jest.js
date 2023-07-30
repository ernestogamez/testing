module.exports = {
  rootDir: '../../',
  verbose: true,
  restoreMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/test/setup-after.ts'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'], // Para que encuentre los estilos de los componentes
};
