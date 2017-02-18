export function OrdinalFilter () {
  return function (input: number): string {
    let s = ['th', 'st', 'nd', 'rd'];
    let v = input % 100;

    return (s[(v - 20) % 10] || s[v] || s[0]);
  };
}
