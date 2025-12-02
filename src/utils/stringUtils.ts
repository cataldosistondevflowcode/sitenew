/**
 * Utilitários para sanitização e escape de strings para uso em queries SQL
 */

/**
 * Escapa caracteres especiais do SQL para prevenir SQL Injection
 * Usado em buscas com ILIKE
 */
export const escapeSqlLike = (str: string): string => {
  return str
    .replace(/\\/g, '\\\\')  // Escapa \
    .replace(/%/g, '\\%')    // Escapa %
    .replace(/_/g, '\\_')    // Escapa _
    .replace(/'/g, "''");    // Escapa '
};

/**
 * Remove caracteres problemáticos antes de buscar
 */
export const sanitizeSearchInput = (str: string): string => {
  return str
    .replace(/[,;]/g, '')  // Remove vírgulas e ponto e vírgula
    .trim();
};

