export function formatNames(names: string[]): string {
    const n = names.length;
  
    if (n === 0) return '';
    if (n === 1) return names[0];
    if (n === 2) return names.join(' & ');
  
    return `${names.slice(0, -1).join(', ')} & ${names[n - 1]}`;
  }