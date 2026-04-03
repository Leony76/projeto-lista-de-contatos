export const formatPhoneNumber = (text: string):string => {
  const cleaned = text.replace(/\D/g, '');

  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

  if (!match) return cleaned;

  const part1 = match[1] ? `(${match[1]}` : '';
  const part2 = match[1] && match[2] ? `) ${match[2]}` : match[2] ? match[2] : '';
  const part3 = match[3] ? `-${match[3]}` : '';

  return `${part1}${part2}${part3}`.trim();
};