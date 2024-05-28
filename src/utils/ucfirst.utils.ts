/**
 * Hàm `ucfirst` viết hoa chữ cái đầu tiên của một string.
 * @param {string} string - Tham số `string` trong hàm `ucfirst` là một giá trị chuỗi muốn viết hoa chữ cái đầu tiên.
 */
export const ucfirst = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
