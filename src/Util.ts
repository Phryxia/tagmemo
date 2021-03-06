export function padZero(num: number, length: number): string {
  let out = `${num}`;
  while (out.length < length)
    out = '0' + out;
  return out;
}

/**
 * YYYY-MM-DD HH:MM 형식으로 날짜를 출력한다.
 * @param date Date 오브젝트
 */
export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${padZero(date.getMinutes(), 2)}`;
}