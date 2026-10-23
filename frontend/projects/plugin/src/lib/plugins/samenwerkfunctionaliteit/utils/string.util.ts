export function capitalize(value: string): string {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

export function transformStringToNormalCase(text: string): string {
  const allLowerCase = text.toLowerCase();
  const removeUnderscore = allLowerCase.replaceAll('_', ' ');
  return capitalize(removeUnderscore);
}
